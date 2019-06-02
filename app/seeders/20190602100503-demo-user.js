'use strict';
let currDate = new Date();
let datetime = `${currDate.getFullYear()}-${currDate.getMonth()}-${currDate.getDate()}`;
datetime += ` ${currDate.getHours()}:${currDate.getMinutes()}:${currDate.getSeconds()}`
module.exports = {
	up: (queryInterface, Sequelize) => {
		/*
		  Add altering commands here.
		  Return a promise to correctly handle asynchronicity.
	
		  Example:
		  return queryInterface.bulkInsert('People', [{
			name: 'John Doe',
			isBetaMember: false
		  }], {});
		*/
		return queryInterface.bulkInsert('Users', [{
			name: 'John Jane',
			email: 'john@jane.com',
			password: 'john@jane',
			createdAt: datetime,
			updatedAt: datetime
		}], {});
	},

	down: (queryInterface, Sequelize) => {
		/*
		  Add reverting commands here.
		  Return a promise to correctly handle asynchronicity.
	
		  Example:
		  return queryInterface.bulkDelete('People', null, {});
		*/
	}
};
