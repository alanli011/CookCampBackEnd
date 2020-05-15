'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('ToDoItems', [
			{
				name: '1 cup butter, softened',
				toDoId: '1',
				completed: false,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: '1 cup white sugar',
				toDoId: '1',
				completed: false,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: '1 cup packed brown sugar',
				toDoId: '1',
				completed: false,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: '2 eggs',
				toDoId: '1',
				completed: false,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: '2 teaspoons vanilla extract',
				toDoId: '1',
				completed: false,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: '1 teaspoon baking soda',
				toDoId: '1',
				completed: false,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: '2 teaspoons hot water',
				toDoId: '1',
				completed: false,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: '0.5 teaspoon salt',
				toDoId: '1',
				completed: false,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: '3 cups all-purpose flour',
				toDoId: '1',
				completed: false,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: '2 cups semisweet chocolate chips',
				toDoId: '1',
				completed: false,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: '1 cup chopped walnuts',
				toDoId: '1',
				completed: false,
				createdAt: new Date(),
				updatedAt: new Date()
			}
		]);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('ToDoItems', null, {});
	}
};
