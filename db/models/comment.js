'use strict';
module.exports = (sequelize, DataTypes) => {
	const Comment = sequelize.define(
		'Comment',
		{
			commentText: {
				type: DataTypes.TEXT,
				allowNull: false
			},
			messageId: {
				type: DataTypes.INTEGER,
				allowNull: false
			}
		},
		{}
	);
	Comment.associate = function(models) {
		Comment.belongsTo(models.Message, { foreignKey: 'messageId' });
	};
	return Comment;
};
