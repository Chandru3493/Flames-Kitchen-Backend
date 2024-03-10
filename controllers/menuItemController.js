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
			// console.log("Menu items retrieved successfully:", menuItems);
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

		// console.log("Fetching menu item with ID:", menuItemId);

		const menuItem = await Order.findByPk(menuItemId, { include: Menu });

		// console.log("fetchi ceej", menuItem);
		// menuItem.orderitem.status = "Shubham";
		if (menuItem) {
			// console.log("Menu item retrieved successfully:", menuItem);
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

exports.getOrdersById = async (req, res) => {
	try {
		const orderItemId = req.params.id;
		const orderItem = await orderitem.findByPk(orderItemId);

		// console.log("aagya ");
		if (!orderItem) {
			return res.status(404).json({ error: "Order item not found" });
		}

		// Access the orderId from the retrieved OrderItem
		const order_id = orderItem.order_id;
		// Get the ID parameter from the request URL

		console.log("Fetching menu item with ID:", order_id);

		const order = await Order.findByPk(order_id);

		// console.log("fetchi ceej", menuItem);
		// menuItem.orderitem.status = "Shubham";
		if (order) {
			console.log("Order item retrieved successfully:", order);
			console.log("fndsd,s");
			res.json(order);
		} else {
			console.log("Order item not found.");
			res.status(404).json({ error: "Order item not found" });
		}
	} catch (error) {
		console.error("Error fetching order item:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};
