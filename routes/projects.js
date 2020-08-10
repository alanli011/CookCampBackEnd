const express = require('express');
const { asyncHandler, handleValidationErrors } = require('../utils/utils');
const bcrypt = require('bcryptjs');
const { User, Project, UserProject, Message, ToDo, Comment, ToDoItem } = require('../db/models');
const { requireAuth } = require('../utils/auth.js');
const Sequelize = require('sequelize');
const { EmptyResultError } = require('sequelize');
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

// finds all messages and order from the most recent update
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

// routes for comments
// gets all comments for specific message id
router.get(
	'/:project_id/messages/:message_id/comments',
	// requireAuth,
	asyncHandler(async (req, res) => {
		const comments = await Comment.findAll({
			where: {
				messageId: req.params.message_id
			},
			order: [ [ 'updatedAt', 'DESC' ] ]
		});
		res.json({ comments });
	})
);

router.post(
	'/:project_id/messages/:message_id/comments',
	// requireAuth,
	asyncHandler(async (req, res) => {
		const comment = await Comment.create({ ...req.body });
		res.status(201).json({ comment });
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
			order: [ [ 'updatedAt', 'DESC' ] ],
			include: [
				{
					model: ToDoItem
				}
			]
		});
		res.json({ toDos });
	})
);

// create a new to do list
router.post(
	'/:id(\\d+)/to-do',
	// requireAuth,
	asyncHandler(async (req, res) => {
		const toDo = await ToDo.create({ ...req.body });
		res.status(201).json({ toDo });
	})
);

// find single to do from list
router.get(
	'/:project_id/to-do/:id',
	// requireAuth,
	asyncHandler(async (req, res) => {
		const toDo = await ToDo.findByPk(req.params.id);
		res.json({ toDo });
	})
);

// finds all the to do items
router.get(
	'/:project_id/to-do/item',
	// requireAuth,
	asyncHandler(async (req, res) => {
		const item = await ToDoItem.findAll({
			order: [ [ 'updatedAt', 'DESC' ] ]
		});
		res.json({ item });
	})
);

// finds all to do item that matches the params id
router.get(
	'/:project_id/to-do/item/:id(\\d+)',
	// requireAuth,
	asyncHandler(async (req, res) => {
		const item = await ToDoItem.findAll({
			where: {
				toDoId: req.params.id
			},
			order: [ [ 'updatedAt', 'DESC' ] ]
		});
		res.json({ item });
	})
);

// creates the item
router.post(
	'/:project_id/to-do/item/:id(\\d+)',
	// requireAuth,
	asyncHandler(async (req, res) => {
		const item = await ToDoItem.create({ ...req.body });
		console.log(item.toJSON());
		res.status(201).json({ item });
	})
);

// updates completed state
router.put(
	'/:project_id/to-do/item/:toDoId/:id',
	// requireAuth,
	asyncHandler(async (req, res, next) => {
		const item = await ToDoItem.findByPk(req.params.id);
		if (item) {
			await item.update({ ...req.body });
			res.json({ item });
		} else {
			const error = new Error();
			error.title = 'Item Not Found';
			error.status = 404;
			next(error);
		}
	})
);

// finds one specific to do
router.get(
	'/:project_id/to-do/item/:toDoId/:id',
	// requireAuth,
	asyncHandler(async (req, res) => {
		const toDo = await ToDoItem.findByPk(req.params.id);
		res.json({ toDo });
	})
);

// deletes to do item
router.delete(
	'/:project_id/to-do/item/:toDoId/:id',
	// requireAuth,
	asyncHandler(async (req, res) => {
		const toDo = await ToDoItem.findByPk(req.params.id);
		console.log(req.params.id);
		console.log(toDo);
		await toDo.destroy();
		res.end();
	})
);

module.exports = router;
