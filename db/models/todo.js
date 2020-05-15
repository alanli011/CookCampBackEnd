'use strict';
module.exports = (sequelize, DataTypes) => {
	const ToDo = sequelize.define(
		'ToDo',
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
	ToDo.associate = function(models) {
		ToDo.belongsTo(models.Project, { foreignKey: 'projectId' });
		ToDo.hasMany(models.ToDoItem, { foreignKey: 'toDoId' });
	};
	return ToDo;
};
