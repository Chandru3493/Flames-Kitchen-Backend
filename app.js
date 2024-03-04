const express = require("express");
const cors = require("cors");

const { sequelize } = require("./db.js");

const app = express();
const port = 4000;

const { Op } = require("sequelize");
const AnuragEmp = require("./models/employee_data.js");

const FinancialDay = require("./models/financial_day_data.js");
const Transaction = require("./models/transactions.js");
const Role = require("./models/role.js");
const Salary = require("./models/salary.js");
const MenuItem = require("./models/menu.js");
const OrderItem = require("./models/orderitem.js");
const Order = require("./models/order.js");
const Table = require("./models/table.js");

const menuItemController = require("./controllers/menuItemController");

AnuragEmp.belongsTo(Role, { targetKey: "roleid", foreignKey: "roleId" });
AnuragEmp.hasOne(Salary, { sourceKey: "id", foreignKey: "empid" });
Order.hasOne(AnuragEmp, { sourceKey: "waiter_id", foreignKey: "id" });
Order.hasMany(OrderItem, { sourceKey: "id", foreignKey: "order_id" });
Order.belongsTo(Table, { foreignKey: "table_id", targetKey: "id" });
MenuItem.hasOne(OrderItem, { sourceKey: "id", foreignKey: "menu_item_id" });
OrderItem.belongsTo(MenuItem, { targetKey: "id", foreignKey: "menu_item_id" });
OrderItem.hasOne(AnuragEmp, { sourceKey: "cook_id", foreignKey: "id" });

(async () => {
	await sequelize.sync({ logging: false, force: false });
	console.log("Tables synchronized successfully");
})();

app.use(express.json());
app.use(cors());

const router = express.Router();

// Handle PUT request to update orderitem status
app.put("/orderitems/:id", async (req, res) => {
	const { id } = req.params;
	const { status } = req.body;
	console.log("id: ", id, " status: ", status);
	try {
		// Find the OrderItem by ID
		const orderItem = await OrderItem.findByPk(id);
		console.log(orderItem.status);
		// console.log("snkldf");

		if (!orderItem) {
			return res.status(404).json({ error: "OrderItem not found" });
		}

		// Update the orderitem status column
		orderItem.status = status;
		await orderItem.save();

		// Respond with success message
		return res
			.status(200)
			.json({ message: "OrderItem status updated successfully" });
	} catch (error) {
		console.error("Error updating orderitem status:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
});

app.delete("/orderItems/:id", async (req, res) => {
	const { id } = req.params; // Extract the ID from the request parameters

	try {
		// Attempt to find the data by its ID and delete it
		const deletedData = await OrderItem.destroy({
			where: {
				id: id, // Filter based on the ID
			},
		});

		if (deletedData) {
			// If data was deleted successfully
			res.status(200).json({ message: "Data deleted successfully" });
		} else {
			// If no data was found with the provided ID
			res.status(404).json({ error: "Data not found" });
		}
	} catch (error) {
		// If an error occurred during the deletion process
		console.error("Error deleting data:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

app.get("/orderItems/:id", menuItemController.getMenuItemById);
app.get("/orderItems", menuItemController.getMenuItems);

app.listen(port, () => {
	console.log(`Running on port ${port}`);
});

module.exports = router;
