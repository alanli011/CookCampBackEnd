const express = require('express');
const { asyncHandler, handleValidationErrors } = require('../utils/utils');
const bcrypt = require('bcryptjs');
const { User, Project } = require('../db/models');
const { requireAuth } = require('../utils/auth.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const router = express.Router();

router.post('/', asyncHandler(async (req, res) => {}));

// returns a list of all the projects
router.get(
	'/',
	asyncHandler(async (req, res) => {
		const projects = await Project.findAll({
			attributes: [ 'projectName', 'projectDescription' ],
			include: [
				{
					model: User
				}
			]
		});
		res.json({ projects });
	})
);

module.exports = router;
