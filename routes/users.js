const express = require('express');
const { asyncHandler, handleValidationErrors } = require('../utils/utils');
const { check } = require('express-validator');
const bcrypt = require('bcryptjs');
const { User } = require('../db/models');

const { getUserToken, requireAuth } = require('../utils/auth.js');

//validate Password
const router = express.Router();

const validateUsername = check('userName').exists({ checkFalsy: true }).withMessage('Please provide a username');

const validateEmailAndPassword = [
	check('email').exists({ checkFalsy: true }).isEmail().withMessage('Please provide a valid email.'),
	check('password').exists({ checkFalsy: true }).withMessage('Please provide a password.')
];

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

router.get(
	'/:id(\\d+)',
	asyncHandler(async (req, res) => {
		console.log(req.body);
		const user = await User.findByPk(req.params.id, {
			attributes: [ 'id', 'userName', 'firstName', 'lastName' ]
		});
		res.json({ user });
	})
);

module.exports = router;
