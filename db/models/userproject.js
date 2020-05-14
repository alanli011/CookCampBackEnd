'use strict';
module.exports = (sequelize, DataTypes) => {
	const UserProject = sequelize.define(
		'UserProject',
		{
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			projectId: {
				type: DataTypes.INTEGER,
				allowNull: false
			}
		},
		{}
	);
	UserProject.associate = function(models) {
		UserProject.belongsTo(models.User, { foreignKey: 'userId' });
		UserProject.belongsTo(models.Project, { foreignKey: 'projectId' });
	};
	return UserProject;
};
