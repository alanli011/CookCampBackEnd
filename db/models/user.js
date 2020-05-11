'use strict';

const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'User',
		{
			userName: {
				type: DataTypes.STRING(30),
				allowNull: false,
				unique: true
			},
			firstName: {
				type: DataTypes.STRING(30),
				allowNull: false
			},
			lastName: {
				type: DataTypes.STRING(35),
				allowNull: false
			},
			email: {
				type: DataTypes.STRING(35),
				allowNull: false,
				unique: true
			},
			hashedPass: {
				type: DataTypes.STRING.BINARY,
				allowNull: false
			}
		},
		{}
	);
	User.associate = function(models) {
		// associations can be defined here
	};

	//instance methods
	User.prototype.validatePassword = function(password) {
		return bcrypt.compareSync(password, this.hashedPass.toString());
	};
	return User;
};
