'use strict';
module.exports = (sequelize, DataTypes) => {
	const Message = sequelize.define(
		'Message',
		{
			name: {
				type: DataTypes.STRING(50),
				allowNull: false
			},
			description: {
				type: DataTypes.TEXT
			},
			projectId: {
				type: DataTypes.INTEGER,
				allowNull: false
			}
		},
		{}
	);
	Message.associate = function(models) {
		Message.belongsTo(models.Project, { foreignKey: 'projectId' });
		Message.hasMany(models.Comment, { foreignKey: 'messageId' });
	};
	return Message;
};
