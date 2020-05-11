'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'Users',
			[
				{
					userName: 'Demo User',
					firstName: 'Demo',
					lastName: 'User',
					email: 'demoUser@demo.com',
					hashedPass: bcrypt.hashSync('cooking'),
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					userName: 'alanli',
					firstName: 'Alan',
					lastName: 'Li',
					email: 'alanli@demo.com',
					hashedPass: bcrypt.hashSync('cookingcamp'),
					createdAt: new Date(),
					updatedAt: new Date()
				}
			],
			{ returning: true }
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Users', null, {});
	}
};
