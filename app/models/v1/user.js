'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		name: DataTypes.STRING,
		email: DataTypes.STRING,
		password: DataTypes.STRING,
		token: DataTypes.STRING,
		status: {
			type: DataTypes.BOOLEAN,
			default: true
		}
	}, {});
	User.associate = function (models) {
		// associations can be defined here
	};

	//Hooks
	User.beforeCreate(async function(user, options) {
		return user.password = await bcrypt.hash(user.password, 8);
	})

	User.prototype.toJSON = function() {
		const user = Object.assign({}, this.get());
		delete user.createdAt;
		delete user.updatedAt;
		delete user.password;
		
		return user;
	}

	User.prototype.generateAuthToken = function() {
		let user = this;
		
		const token = jwt.sign({
			id: user.id
		}, process.env.JWT_SECRET);
	
		user.token = token;
	
		return token;
	}

 	return User;
};