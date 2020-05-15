'use strict';
module.exports = (sequelize, DataTypes) => {
	const ToDoItem = sequelize.define(
		'ToDoItem',
		{
			name: {
				type: DataTypes.STRING(50),
				allowNull: false
			},
			description: {
				type: DataTypes.TEXT
			},
			toDoId: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			completed: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false
			}
		},
		{}
	);
	ToDoItem.associate = function(models) {
		ToDoItem.belongsTo(models.ToDo, { foreigKey: 'toDoId' });
	};
	return ToDoItem;
};
