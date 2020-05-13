'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('UserProjects', [
			{
				userId: 1,
				projectId: 1,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				userId: 2,
				projectId: 1,
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				userId: 1,
				projectId: 2,
				createdAt: new Date(),
				updatedAt: new Date()
			}
		]);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('UserProjects', null, {});
	}
};
