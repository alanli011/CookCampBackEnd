'use strict';
module.exports = (sequelize, DataTypes) => {
	const Project = sequelize.define(
		'Project',
		{
			projectName: {
				type: DataTypes.STRING(50),
				allowNull: false
			},
			projectDescription: {
				type: DataTypes.TEXT
			}
		},
		{}
	);
	Project.associate = function(models) {
		const columnMapping = {
			through: 'UserProject',
			otherKey: 'userId',
			foreignKey: 'projectId'
		};
		Project.belongsToMany(models.User, columnMapping);
	};
	return Project;
};
