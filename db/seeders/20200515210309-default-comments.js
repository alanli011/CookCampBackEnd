'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Comments', [
			{
				commentText:
					"There is Bob's Red Mill Unbleached Organic All-Purpose Flour, Heckers Unbleached All-Purpose Flour, King Arthur Unbleached All-Purpose Flour, Pillsbury's Best All-Purpose Flour",
				messageId: '1',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentText: 'Vegetable Oil',
				messageId: '2',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentText: 'corn oil',
				messageId: '2',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				commentText: 'Peanut Oil is the new craze',
				messageId: '2',
				createdAt: new Date(),
				updatedAt: new Date()
			}
		]);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Comments', null, {});
	}
};
