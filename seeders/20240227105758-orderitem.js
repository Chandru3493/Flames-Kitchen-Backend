

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"orderitems",
			[
				{
					order_id: 1,

					cook_id: null,
					status: "todo",
					menu_item_id: 1,
					quantity: 1,

					price: 100,
				},
				{
					order_id: 1,
					cook_id: null,
					status: "inprogress",
					menu_item_id: 2,
					quantity: 1,

					price: 100,
				},
				{
					order_id: 1,
					cook_id: null,
					status: "closed",
					menu_item_id: 3,
					quantity: 1,

					price: 100,
				},
				{
					order_id: 1,
					cook_id: null,
					status: "todo",
					menu_item_id: 4,
					quantity: 1,

					price: 100,
				},
				{
					order_id: 1,
					cook_id: null,
					status: "todo",
					menu_item_id: 5,
					quantity: 1,

					price: 100,
				},
				{
					order_id: 1,
					cook_id: null,
					status: "closed",
					menu_item_id: 6,
					quantity: 1,

					price: 100,
				},
				{
					order_id: 1,
					cook_id: null,
					status: "todo",
					menu_item_id: 7,
					quantity: 1,

					price: 100,
				},
				{
					order_id: 1,
					cook_id: null,
					status: "inprogress",
					menu_item_id: 8,
					quantity: 1,

					price: 100,
				},
				{
					order_id: 1,
					cook_id: null,
					status: "inprogress",
					menu_item_id: 9,
					quantity: 1,

					price: 100,
				},
				{
					order_id: 1,
					cook_id: null,
					status: "todo",
					menu_item_id: 10,
					quantity: 1,

					price: 100,
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},


};
