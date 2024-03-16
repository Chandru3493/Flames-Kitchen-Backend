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
                {
                    name: "Tacos",
                    description: "Mexican dish consisting of corn or flour tortillas filled with meats, vegetables, cheese, and various toppings.",
                    price: 120,
                    category: "Main Course",
                    available: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Burrito",
                    description: "A large flour tortilla filled with various ingredients such as rice, beans, meats, cheese, and toppings.",
                    price: 180,
                    category: "Main Course",
                    available: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Pad Thai",
                    description: "Thai stir-fried rice noodle dish with eggs, tofu, vegetables, and a flavorful sauce.",
                    price: 150,
                    category: "Main Course",
                    available: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },                
                {
                    name: "Spring Rolls",
                    description: "Crispy fried rolls filled with vegetables and sometimes meat, served with a dipping sauce.",
                    price: 80,
                    category: "Starter",
                    available: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                { 
                    name: "Chicken Wings",
                    description: "Crispy baked or fried chicken wings tossed in a variety of sauces.",
                    price: 100,
                    category: "Starter",
                    available: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Vegetable Tempura",
                    description: "Japanese dish of lightly battered and deep-fried vegetables.",
                    price: 140,
                    category: "Starter",
                    available: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Spaghetti Bolognese",
                    description: "Classic Italian dish of spaghetti noodles with a rich meat-based tomato sauce.",
                    price: 170,
                    category: "Main Course",
                    available: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Fish and Chips",
                    description: "British dish of battered and fried fish served with thick-cut fries.",
                    price: 200,
                    category: "Main Course",
                    available: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Falafel",
                    description:
                        "Middle Eastern dish of spiced, deep-fried balls made from ground chickpeas or fava beans.",
                    price: 130,
                    category: "Starter",
                    available: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Grilled Chicken Salad",
                    description: "Healthy salad with grilled chicken, mixed greens, vegetables, and a vinaigrette dressing.",
                    price: 160,
                    category: "Main Course",
                    available: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Tiramisu",
                    description: "Italian coffee-flavored dessert with ladyfingers and a creamy mascarpone filling.",
                    price: 120,
                    category: "Dessert",
                    available: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Chocolate Cake",
                    description: "Rich and decadent chocolate cake, perfect for any chocolate lover.",
                    price: 110,
                    category: "Dessert",
                    available: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }, 
                {
                    name: "French Fries",
                    description: "Crispy, fried potatoes.",
                    price: 100,
                    category: "Side",
                    available: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Fruit Salad",
                    description: "A mix of fresh fruits like strawberries, blueberries, oranges, etc., with sweet dressings.",
                    price: 90,
                    category: "Dessert",
                    available: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Cheesecake",
                    description: "Rich and creamy dessert with a baked graham cracker crust filled with a sweetened cream cheese mixture.",
                    price: 150,
                    category: "Dessert",
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
