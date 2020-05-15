const express = require('express');
const { asyncHandler, handleValidationErrors } = require('../utils/utils');
const bcrypt = require('bcryptjs');
const { User, Project, UserProject } = require('../db/models');
const { requireAuth } = require('../utils/auth.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const router = express.Router();

//create a new project
router.post(
	'/',
	// requireAuth,
	asyncHandler(async (req, res) => {
		const project = await Project.create({ ...req.body });
		console.log(project.toJSON());
		res.status(201).json({
			projects: {
				id: project.id,
				projectName: project.projectName
			}
		});
	})
);

// returns a list of all the projects
router.get(
	'/',
	// requireAuth,
	asyncHandler(async (req, res) => {
		const projects = await Project.findAll({
			attributes: [ 'id', 'projectName', 'projectDescription' ]
		});
		res.json({ projects });
	})
);

router.get(
	'/:id(\\d+)',
	// requireAuth,
	asyncHandler(async (req, res) => {
		const project = await Project.findByPk(req.params.id, {
			include: [
				{
					model: User
				}
			]
		});
		res.json({ project });
	})
);

router.delete(
	'/:id(\\d+)',
	// requireAuth,
	asyncHandler(async (req, res) => {
		const project = await Project.findByPk(req.params.id, {
			attributes: [ 'id' ]
		});
		await project.destroy();
		res.end();
	})
);

module.exports = router;
