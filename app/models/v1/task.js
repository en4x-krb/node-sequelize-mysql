'use strict';
module.exports = (sequelize, DataTypes) => {
	const Task = sequelize.define('Task', {
		description: DataTypes.STRING,
		name: DataTypes.STRING,
		completed: {
			type: DataTypes.BOOLEAN,
			default: false
		},
		userId: DataTypes.INTEGER,
		status: {
			type: DataTypes.BOOLEAN,
			default: true
		}
	}, {});
	Task.associate = function (models) {
		// associations can be defined here
	};
	return Task;
};