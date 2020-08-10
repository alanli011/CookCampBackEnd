const express = require('express');
const { asyncHandler, handleValidationErrors } = require('../utils/utils');
const { check } = require('express-validator');
const bcrypt = require('bcryptjs');
const { User, Project, UserProject } = require('../db/models');

const { getUserToken, requireAuth } = require('../utils/auth.js');

//validate Password
const router = express.Router();

// helper function to handle validation of username on the backend
const validateUsername = check('userName').exists({ checkFalsy: true }).withMessage('Please provide a username');

// helper function to handle validation of email and password on the backend
const validateEmailAndPassword = [
	check('email').exists({ checkFalsy: true }).isEmail().withMessage('Please provide a valid email.'),
	check('password').exists({ checkFalsy: true }).withMessage('Please provide a password.')
];

// helper function to handle validation of password on the backend
const validatePassword = [ check('password').exists({ checkFalsy: true }).withMessage('Please provide a password.') ];

// create user
router.post(
	'/',
	validateUsername,
	validateEmailAndPassword,
	handleValidationErrors,
	asyncHandler(async (req, res) => {
		const { userName, firstName, lastName, email, password } = req.body;
		const hashedPass = await bcrypt.hash(password, 10);
		const user = await User.create({
			userName,
			firstName,
			lastName,
			email,
			hashedPass
		});

		const token = getUserToken(user);
		res.status(201).json({
			user: { id: user.id },
			token
		});
	})
);

//authenticate
router.post(
	'/token',
	asyncHandler(async (req, res, next) => {
		const { email, password } = req.body;
		const user = await User.findOne({
			where: {
				email
			}
		});
		//pass validate and error handling
		if (!user || !user.validatePassword(password)) {
			const err = new Error('Login failed');
			err.status = 401;
			err.title = 'Login failed';
			err.errors = [ 'The provided credentials were invalid.' ];
			return next(err);
		}
		//login successful
		const token = getUserToken(user);
		res.json({ token, user: { id: user.id } });
	})
);

// Gets all user
router.get(
	'/',
	asyncHandler(async (req, res) => {
		const users = await User.findAll();
		res.json({ users });
	})
);

// Gets one user with the following attributes
router.get(
	'/:id(\\d+)',
	// requireAuth,
	asyncHandler(async (req, res) => {
		const user = await User.findByPk(req.params.id, {
			attributes: [ 'id', 'userName', 'firstName', 'lastName', 'email' ]
		});
		res.json({ user });
	})
);

// Gets all the projects for that one user
router.get(
	'/:id(\\d+)/projects',
	// requireAuth,
	asyncHandler(async (req, res) => {
		const projects = await User.findByPk(req.params.id, {
			attributes: [ 'id' ],
			include: [
				{
					model: Project
				}
			]
		});
		res.json({ projects });
	})
);

// create a project for that one user
router.post(
	'/:id(\\d+)/projects',
	// requireAuth,
	asyncHandler(async (req, res) => {
		const user = await User.findByPk(req.params.id, {
			attributes: [ 'id' ]
		});

		const project = await Project.create({ ...req.body });
		await UserProject.create({ userId: user.id, projectId: project.id });
		res.status(201).json({
			user,
			project
		});
	})
);

module.exports = router;
