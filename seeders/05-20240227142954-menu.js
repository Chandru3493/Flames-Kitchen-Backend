"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"menuitems",
			[
				{
					name: "Biriyani",
					description:
						"A classic Indian rice dish cooked with aromatic spices, basmati rice, and tender meat or vegetables.",
					price: 70,
					category: "Main Course",
					available: true,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Naan",
					description:
						"Soft and fluffy Indian bread made with flour, yeast, and yogurt, baked in a tandoor oven.",
					price: 180,
					category: "Main Course",
					available: true,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Rasmalai",
					description:
						"A popular Indian dessert made with soft paneer cheese dumplings soaked in sweetened, thickened milk, flavored with cardamom and saffron.",
					price: 30,
					category: "Dessert",
					available: true,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Miso Soup",
					description:
						"A traditional Japanese soup made with miso paste, tofu, seaweed, and green onions.",
					price: 100,
					category: "Starter",
					available: true,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Pasta",
					description:
						"Classic Italian pasta dish with al dente noodles served in a variety of sauces, including marinara, Alfredo, and pesto.",
					price: 150,
					category: "Main Course",
					available: true,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Sushi",
					description:
						"Japanese dish consisting of vinegared rice combined with various ingredients such as seafood, vegetables, and occasionally tropical fruits.",
					price: 120,
					category: "Starter",
					available: true,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Caesar Salad",
					description:
						"A classic salad made with romaine lettuce, croutons, Parmesan cheese, lemon juice, olive oil, egg, Worcestershire sauce, garlic, and black pepper.",
					price: 60,
					category: "Starter",
					available: true,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Garlic Bread",
					description:
						"Toasted bread topped with garlic, butter, and sometimes cheese, served as an appetizer or side dish.",
					price: 80,
					category: "Starter",
					available: true,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Pizza",
					description:
						"Italian dish consisting of a yeasted flatbread typically topped with tomato sauce, cheese, and various toppings.",
					price: 250,
					category: "Main Course",
					available: true,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Chicken Chowmein",
					description:
						"Stir-fried noodles with chicken, vegetables, and sometimes seafood, flavored with soy sauce, garlic, ginger, and other seasonings.",
					price: 400,
					category: "Main Course",
					available: true,
					createdAt: new Date(),
					updatedAt: new Date(),
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
