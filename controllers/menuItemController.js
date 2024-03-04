// controllers/menuItemController.js
const Employee = require("../models/employee_data");
const Menu = require("../models/menu");
const Order = require("../models/order");
const orderitem = require("../models/orderitem");

exports.getMenuItems = async (req, res) => {
	try {
		console.log("Fetching menu items...");
		// const menuItems = await Menu.findAll({
		// 	include: orderitem,
		// 	where: { category: "main course" },
		// });
		const menuItems = await orderitem.findAll({
			include: Menu,
		});

		if (menuItems) {
			console.log("Menu items retrieved successfully:", menuItems);
			res.json(menuItems);
		} else {
			console.log("No menu items found.");
			res.status(404).json({ error: "No menu items found" });
		}
	} catch (error) {
		console.error("Error fetching menu items:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

exports.getMenuItemById = async (req, res) => {
	try {
		const menuItemId = req.params.id; // Get the ID parameter from the request URL

		console.log("Fetching menu item with ID:", menuItemId);

		const menuItem = await orderitem.findByPk(menuItemId, { include: Menu });

		// console.log("fetchi ceej", menuItem);
		// menuItem.orderitem.status = "Shubham";
		if (menuItem) {
			console.log("Menu item retrieved successfully:", menuItem);
			res.json(menuItem);
		} else {
			console.log("Menu item not found.");
			res.status(404).json({ error: "Menu item not found" });
		}
	} catch (error) {
		console.error("Error fetching menu item:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};
