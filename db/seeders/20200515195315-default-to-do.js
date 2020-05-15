'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('ToDos', [
			{
				name: 'Buy Groceries',
				description: 'Everyone needs groceries to bake!',
				projectId: '1',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: 'Prepare the food',
				description: 'Know how to prepare your food in steps',
				projectId: '2',
				createdAt: new Date(),
				updatedAt: new Date()
			}
		]);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('ToDos', null, {});
	}
};
