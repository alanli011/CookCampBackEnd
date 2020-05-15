'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Messages', [
			{
				name: "Which brand of flours do ya'll like to buy?",
				description: 'Just wanted to get your opinion on above',
				projectId: '1',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: 'Which oil do you prefer to cook with?',
				description: 'There are so many! I thought only olive oil existed!',
				projectId: '2',
				createdAt: new Date(),
				updatedAt: new Date()
			}
		]);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Messages', null, {});
	}
};
