const express = require('express');
const { asyncHandler, handleValidationErrors } = require('../utils/utils');
const { check } = require('express-validator');
const bcrypt = require('bcryptjs');

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
		// const user = await User.create({
		//     userName, firstName, lastName, email,
		//     hashedPass, revScore, statusTypeId: parseInt(statusTypeId)
		// });

		// const token = getUserToken(user);
		// res.status(201).json({
		//     user: { id: user.id },
		//     token,
		// });
	})
);

module.exports = router;
