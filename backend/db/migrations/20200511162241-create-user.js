'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			userName: {
				type: Sequelize.STRING(30),
				allowNull: false,
				unique: true
			},
			firstName: {
				type: Sequelize.STRING(30),
				allowNull: false
			},
			lastName: {
				type: Sequelize.STRING(35),
				allowNull: false
			},
			email: {
				type: Sequelize.STRING(35),
				allowNull: false,
				unique: true
			},
			hashedPass: {
				type: Sequelize.STRING.BINARY,
				allowNull: false
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Users');
	}
};
