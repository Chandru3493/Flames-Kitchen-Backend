"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"orders",
			[
				{
					table_id: 1,
					waiter_id: 2,
					order_time: new Date(),
					status: "done",
					total_amount: 150.25,
					order_prep: 1,

					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					table_id: 2,
					waiter_id: 3,
					order_time: new Date(),
					status: "todo",
					total_amount: 200.75,
					order_prep: 0,

					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					table_id: 3,
					waiter_id: 1,
					order_time: new Date(),
					status: "inprogress",
					total_amount: 80.5,
					order_prep: 1,

					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					table_id: 4,
					waiter_id: 2,
					order_time: new Date(),
					status: "todo",
					total_amount: 120.0,
					order_prep: 0,

					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					table_id: 5,
					waiter_id: 3,
					order_time: new Date(),
					status: "done",
					total_amount: 300.0,
					order_prep: 1,

					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		// Revert seed commands here if needed
	},
};
