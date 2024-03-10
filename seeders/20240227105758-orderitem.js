"use strict";
//todo , todo
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

					price: 70,
				},
				{
					order_id: 1,
					cook_id: null,
					status: "todo",
					menu_item_id: 2,
					quantity: 1,

					price: 100,
				},
				{
					order_id: 4,
					cook_id: null,
					status: "todo",
					menu_item_id: 3,
					quantity: 1,

					price: 150,
				},
				{
					order_id: 3,
					cook_id: null,
					status: "todo",
					menu_item_id: 4,
					quantity: 1,

					price: 120,
				},
				{
					order_id: 3,
					cook_id: null,
					status: "todo",
					menu_item_id: 5,
					quantity: 1,

					price: 60,
				},
				{
					order_id: 1,
					cook_id: null,
					status: "todo",
					menu_item_id: 6,
					quantity: 1,

					price: 80,
				},
				{
					order_id: 1,
					cook_id: null,
					status: "todo",
					menu_item_id: 7,
					quantity: 1,

					price: 250,
				},
				{
					order_id: 2,
					cook_id: null,
					status: "todo",
					menu_item_id: 8,
					quantity: 1,

					price: 100,
				},
				{
					order_id: 2,
					cook_id: null,
					status: "todo",
					menu_item_id: 9,
					quantity: 1,

					price: 200,
				},
				{
					order_id: 2,
					cook_id: null,
					status: "todo",
					menu_item_id: 10,
					quantity: 1,

					price: 400,
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
