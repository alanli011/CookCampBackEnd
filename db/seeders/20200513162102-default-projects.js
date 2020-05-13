'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Projects', [
			{
				projectName: 'Baking',
				projectDescription: 'Manage all the projects relating to baking',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				projectName: 'Cooking',
				projectDescription: 'Manage all the projects relating to cooking',
				createdAt: new Date(),
				updatedAt: new Date()
			}
		]);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Projects', null, {});
	}
};
