const express = require('express');
const { asyncHandler, handleValidationErrors } = require('../utils/utils');
const bcrypt = require('bcryptjs');
const { User, Project, UserProject, Message, ToDo, Comment, ToDoItem } = require('../db/models');
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

// returns a specific project
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

// deletes a project
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

// message board routes

// finds all messages
router.get(
	'/:id(\\d+)/messages',
	// requireAuth,
	asyncHandler(async (req, res) => {
		const messages = await Message.findAll({
			where: {
				projectId: req.params.id
			},
			order: [ [ 'updatedAt', 'DESC' ] ]
		});
		res.json({ messages });
	})
);

router.post(
	'/:id(\\d+)/messages',
	// requireAuth,
	asyncHandler(async (req, res) => {
		const message = await Message.create({ ...req.body });
		console.log(message);
		res.status(201).json({ message });
	})
);

// finds one specific message
router.get(
	'/:project_id/messages/:id',
	// requireAuth,
	asyncHandler(async (req, res) => {
		const message = await Message.findByPk(req.params.id);
		res.json({ message });
	})
);

// deletes message
router.delete(
	'/:project_id/messages/:id',
	// requireAuth,
	asyncHandler(async (req, res) => {
		const message = await Message.findByPk(req.params.id, {
			attributes: [ 'id' ]
		});
		await message.destroy();
		res.end();
	})
);

// finds all todos
router.get(
	'/:id(\\d+)/to-do',
	// requireAuth,
	asyncHandler(async (req, res) => {
		const toDos = await ToDo.findAll({
			where: {
				projectId: req.params.id
			},
			order: [ [ 'updatedAt', 'DESC' ] ]
		});
		res.json({ toDos });
	})
);

// finds one specific message
router.get(
	'/:todo_id/to-do/:id',
	// requireAuth,
	asyncHandler(async (req, res) => {
		const toDo = await ToDo.findByPk(req.params.id);
		res.json({ toDo });
	})
);

// deletes message
router.delete(
	'/:todo_id/to-do/:id',
	// requireAuth,
	asyncHandler(async (req, res) => {
		const toDo = await ToDo.findByPk(req.params.id, {
			attributes: [ 'id' ]
		});
		await toDo.destroy();
		res.end();
	})
);

module.exports = router;
