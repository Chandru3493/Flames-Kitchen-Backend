const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken"); // Add JWT module
const bcrypt = require("bcrypt"); // Add bcrypt module

// const {Server} = require('socket.io');
const { sequelize } = require("./db.js");

const hash = (pass) => {
	return bcrypt.hash(pass, 10);
};

const app = express();
const port = 4000;

// const sock = new Server(server)
const menuItemController = require("./controllers/menuItemController");
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

AnuragEmp.belongsTo(Role, { targetKey: "roleid", foreignKey: "roleId" });
AnuragEmp.hasOne(Salary, { sourceKey: "id", foreignKey: "empid" });
Order.hasOne(AnuragEmp, { sourceKey: "waiter_id", foreignKey: "id" });
Order.hasMany(OrderItem, { sourceKey: "id", foreignKey: "order_id" });
Order.belongsTo(Table, { foreignKey: "table_id", targetKey: "id" });
OrderItem.belongsTo(MenuItem, { foreignKey: "menu_item_id", targetKey: "id" });
MenuItem.hasOne(OrderItem, { sourceKey: "id", foreignKey: "menu_item_id" });
OrderItem.hasOne(AnuragEmp, { sourceKey: "cook_id", foreignKey: "id" });

(async () => {
	await sequelize.sync({ logging: false, force: false });
	console.log("Tables synchronized successfully");
})();

app.use(express.json());
app.use(cors());

const server = app.listen(port, () => {
	console.log(`Running on port ${port}`);
});

const router = express.Router();

app.get("/employee", async (req, res) => {
	console.log(req.query.name);

	const vals = await AnuragEmp.findAll({
		include: [Role, Salary],
		where: { name: req.query.name },
	});
	const menuItems = await OrderItem.findAll({
		include: [
			AnuragEmp, // Include the Menu model // Specify the attributes you want to fetch, e.g., name
		],
	});
	menuItems.forEach((item) => {
		console.log(item.dataValues);
	});

	var x = [];
	vals.forEach((item) => {
		const v = item.dataValues.role.dataValues;
		const c = item.dataValues.salary.dataValues;

		x.push({ ...item.dataValues, role: v.rolename, salary: c.emp_salary });
	});

	res.send(x);
});

app.post("/addemployee", async (req, res) => {
	const val = await AnuragEmp.findAll({
		where: { email_id: req.body.emailid },
	});

	if (val.length != 0) {
		res.send("already exists");
	} else {
		const roletext = await Role.findAll({
			attributes: ["rolename", "roleid"],
			where: { rolename: req.body.emprole },
		});
		console.log(roletext);
		const act = roletext[0].dataValues.roleid;
		console.log(act);
		const hashed = await hash(req.body.password);
		console.log(hashed);
		const hal = await AnuragEmp.create({
			email_id: req.body.emailid,
			name: req.body.empname,
			roleId: act,
			password: hashed,
			address: req.body.empaddress,
		});

		const q = await Salary.create({ emp_salary: req.body.empsalary });
		res.send("ok");
	}
});

app.get("/datas", async (req, res) => {
	try {
		const data = await AnuragEmp.findAll({
			include: [Role, Salary],
			where: { deletedAt: null },
			order: [
				["roleId", "ASC"],
				["name", "ASC"],
			],
		});
		const d = [];
		data.forEach((item) => {
			const v = item.dataValues.role.dataValues;
			const c = item.dataValues.salary.dataValues;
			d.push({ ...item.dataValues, salary: c.emp_salary, role: v.rolename });
		});

		res.json(d);
	} catch (err) {
		console.error(err.message);
	}
});

app.get("/prevdatas", async (req, res) => {
	try {
		const data = await AnuragEmp.findAll({
			include: [Role, Salary],
			where: { deletedAt: { [Op.not]: null } },
		});
		const d = [];
		data.forEach((item) => {
			const v = item.dataValues.role.dataValues;
			const c = item.dataValues.salary.dataValues;
			d.push({ ...item.dataValues, salary: c.emp_salary, role: v.rolename });
		});

		res.json(d);
	} catch (err) {
		console.error(err.message);
	}
});

app.get("/datas/:username", async (req, res) => {
	const username = req.params.username;
	try {
		const data = await AnuragEmp.findAll({
			include: [Role, Salary],
			where: { name: username, deletedAt: null },
			order: [
				["roleId", "ASC"],
				["name", "ASC"],
			],
		});
		const d = [];
		data.forEach((item) => {
			const v = item.dataValues.role.dataValues;
			const c = item.dataValues.salary.dataValues;
			d.push({ ...item.dataValues, salary: c.emp_salary, role: v.rolename });
		});

		res.json(d);
	} catch (err) {
		console.error(err.message);
	}
});

app.get("/data/:role", async (req, res) => {
	const role = req.params.role;
	const roleid = await Role.findAll({ where: { rolename: role } });
	const x = roleid[0].dataValues.roleid;
	try {
		const data = await AnuragEmp.findAll({
			include: [Role, Salary],
			where: { roleId: x, deletedAt: null },
			order: [["name", "ASC"]],
		});
		var d = [];
		data.forEach((item) => {
			const v = item.dataValues.role.dataValues;
			const c = item.dataValues.salary.dataValues;
			d.push({ ...item.dataValues, salary: c.emp_salary, role: v.rolename });
		});
		console.log(d);
		res.json(d);
	} catch (err) {
		console.error(err.message);
	}
});

app.put("/restore/:id", async (req, res) => {
	const { id } = req.params;

	const delsal = await Salary.update(
		{ deletedAt: null },
		{ where: { empid: id } }
	);
	const delemp = await AnuragEmp.update(
		{ deletedAt: null },
		{ where: { id: id } }
	);

	res.send("done");
});

app.put("/delemp/:id", async (req, res) => {
	const { id } = req.params;

	const delsal = await Salary.update(
		{ deletedAt: new Date() },
		{ where: { empid: id } }
	);
	const delemp = await AnuragEmp.update(
		{ deletedAt: new Date() },
		{ where: { id: id } }
	);

	res.send("done");
});

app.put("/datas/:id", async (req, res) => {
	const { id } = req.params;
	const { name, email, address, role, salary } = req.body;

	//
	const exists = await AnuragEmp.findAll({
		where: { email_id: email, id: { [Op.ne]: id } },
	});
	if (exists.length === 0) {
		if (role === "admin") {
			var ri = 1;
		} else if (role === "waiter") {
			var ri = 2;
		} else {
			var ri = 3;
		}
		//
		try {
			const data = await Salary.update(
				{ emp_salary: Number(salary) },
				{ where: { empid: id } }
			);
			const data1 = await AnuragEmp.update(
				{ email_id: email, name: name, address: address, roleId: ri },
				{ where: { id: id } }
			);

			const x = [];
			data.forEach((item) => {
				x.push(item.dataValues);
			});
			res.json(exists);
		} catch (err) {
			console.error(err.message);
		}
		//
	} else {
		res.send(exists);
	}
	//
});

app.get("/day", async (req, res) => {
	const resu = await FinancialDay.findAll({
		where: { date: req.query.datestamp },
	});
	if (resu.length == 0) {
		res.send("No data for this date found");
	} else {
		var rows = resu[0].dataValues;
		const row1 = rows;

		const res2 = await Transaction.findAll({
			where: { date: req.query.datestamp },
		});
		const rows2 = [];
		res2.forEach((item) => {
			rows2.push(item.dataValues);
		});
		console.log(rows2);
		const send = { ...rows, transactions: rows2 };
		if (resu.length == 0 && rows2.length === 0) {
			res.send("No data for this date found");
		} else {
			console.log(send);
			res.send(send);
		}
	}
});

app.post("/login", async (req, res) => {
	const { email, password } = req.body;

	console.log(`Attempting login for email: ${email}`);

	// Find user by email
	const user = await AnuragEmp.findOne({
		where: {
			email_id: email,
			deletedAt: null, // Condition to check if deletedAt is null
		},
		attributes: ["id", "roleId", "password", "name"], // Include password in the returned user object
	});

	if (!user) {
		console.log(`Login failed for email: ${email}`);
		return res.status(401).json({ error: "Invalid login" });
	}

	const { id, roleId, password: hashedPassword, name } = user; // Ensure correct assignment

	// Check if hashedPassword is null or undefined
	if (!hashedPassword) {
		console.log(`Login failed for email: ${email}`);
		return res.status(401).json({ error: "Invalid login" });
	}

	// Compare hashed password with the provided password
	const passwordMatch = await bcrypt.compare(password, hashedPassword);

	if (!passwordMatch) {
		console.log(`Login failed for email: ${email}`);
		return res.status(401).json({ error: "Invalid login" });
	}

	// Generate JWT token
	const token = jwt.sign(
		{ userId: id, userRole: roleId, userName: name },
		"your_secret_key_here",
		{ expiresIn: "1h" }
	);

	console.log(
		`Login successful for email: ${email}, user ID: ${id}, roleId: ${roleId}`
	);

	// Send response with user details and token
	res.json({
		message: "Login successful",
		user_id: id,
		user_roleId: roleId,
		token,
	});
});

// // Handle PUT request to update orderitem status
// app.put("/orderitems/:id", async (req, res) => {
// 	const { id } = req.params;
// 	const { status, cookid } = req.body;

// 	console.log("id: ", id, " status: ", status);
// 	try {
// 		// Find the OrderItem by ID
// 		const orderItem = await OrderItem.findByPk(id);
// 		console.log(orderItem.status);
// 		// console.log("snkldf");

// 		if (!orderItem) {
// 			return res.status(404).json({ error: "OrderItem not found" });
// 		}

// 		if (status === "todo") {
// 			orderItem.cook_id = null;
// 		} else {
// 			orderItem.cook_id = cookid;
// 		}
// 		// Update the orderitem status column
// 		orderItem.status = status;

// 		await orderItem.save();
// 		// sock.emit('update');

// 		// Respond with success message
// 		return res
// 			.status(200)
// 			.json({ message: "OrderItem status updated successfully" });
// 	} catch (error) {
// 		console.error("Error updating orderitem status:", error);
// 		return res.status(500).json({ error: "Internal server error" });
// 	}
// });

// app.delete("/orderItems/:id", async (req, res) => {
// 	const { id } = req.params; // Extract the ID from the request parameters

// 	try {
// 		// Attempt to find the data by its ID and delete it
// 		const deletedData = await OrderItem.destroy({
// 			where: {
// 				id: id, // Filter based on the ID
// 			},
// 		});

// 		if (deletedData) {
// 			// If data was deleted successfully
// 			res.status(200).json({ message: "Data deleted successfully" });
// 		} else {
// 			// If no data was found with the provided ID
// 			res.status(404).json({ error: "Data not found" });
// 		}
// 	} catch (error) {
// 		// If an error occurred during the deletion process
// 		console.error("Error deleting data:", error);
// 		res.status(500).json({ error: "Internal server error" });
// 	}
// });

// app.get("/orderItems/:id", menuItemController.getMenuItemById);
// app.get("/orderItems", menuItemController.getMenuItems);

// Handle PUT request to update orderitem status
app.put("/orderitems/:id", async (req, res) => {
	const { id } = req.params;
	const { status, cookid } = req.body;

	// console.log("id: ", id, " status: ", status);
	try {
		// Find the OrderItem by ID
		const orderItem = await OrderItem.findByPk(id);
		// console.log(orderItem.status);
		// console.log("snkldf");

		if (!orderItem) {
			return res.status(404).json({ error: "OrderItem not found" });
		}

		if (status === "todo") {
			orderItem.cook_id = null;
		} else {
			orderItem.cook_id = cookid;
		}
		// Update the orderitem status column
		orderItem.status = status;

		await orderItem.save();
		// sock.emit('update');

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

app.get("/orderItems/count", async (req, res) => {
	console.log("ye hai ");
	try {
		const { orderItemId } = req.query;
		const orderItem = await OrderItem.findByPk(orderItemId);

		if (!orderItem) {
			return res.status(404).json({ error: "Order item not found" });
		}

		const order_id = orderItem.order_id;

		// Access the orderId from the retrieved OrderItem

		const todoCount = await OrderItem.count({
			where: {
				order_id,
				[Op.or]: [{ status: "todo" }, { status: "inprogress" }],
			},
		});
		const order = await Order.findByPk(order_id);

		if (todoCount === 0) {
			// Fetch the order associated with the orderItem

			// Update the status of the order to 'done'
			// await order.update({ status: "done" }, {total_amount:sum});
			await order.update({ status: "done" });
		} else {
			// Update the status of the order to 'todo'
			await order.update({ status: "todo" });
		}

		if (order.status == "done") {
			try {
				// Update the status of OrderItems to "softdelete" for the same order_id
				await OrderItem.update(
					{ status: "softdelete" }, // New status value
					{ where: { order_id } } // Condition to match the order_id
				);

				// Fetch orderItems with associated menuItems
				const orderItemsWithMenuItems = await OrderItem.findAll({
					where: { order_id },
					include: [{ model: MenuItem, attributes: ["name"] }],
				});

				// Extract the names of menu items from the orderItems
				const itemNames = orderItemsWithMenuItems.map(
					(orderItem) => orderItem.menuitem.name
				);

				// await order.update({ total_amount: 100 });
				const totalPrice = await OrderItem.sum("price", {
					where: { order_id: order_id },
				});
				// const totalPrice = await OrderItem.sum("price", {
				// 	where: {
				// 		order_id: order_id,
				// 	},
				// 	include: [
				// 		{
				// 			model: MenuItem, // Assuming MenuItem is the model for the menuitem table
				// 			attributes: [], // We only need the sum, so no need to include any attributes from MenuItem
				// 		},
				// 	],
				// });

				// Update the total_amount column of the order with the calculated sum
				await order.update({ total_amount: totalPrice });

				const t = await sequelize.transaction();
				const currentDate = new Date();

				// Format the date and time as per your requirements
				const formattedDate = currentDate.toISOString().split("T")[0]; // Extract date in YYYY-MM-DD format
				const formattedTime = currentDate.toLocaleTimeString();
				const newTransaction = await Transaction.create(
					{
						date: formattedDate,
						time: formattedTime,
						mode: "online",
						name: "A",
						refid: 9,
						type: "food order",
						sum: totalPrice,
						items: itemNames,
					},
					{ transaction: t }
				);

				// Commit the transaction if all operations are successful
				await t.commit();
				console.log("Transaction committed successfully.");
			} catch (error) {
				console.error("Error calculating total price:", error);
				res.status(500).json({ error: "Internal server error" });
			}
		}
		// console.log("Count from app : ", todoCount);
		res.json({ count: todoCount });
	} catch (error) {
		console.error("Error counting todo items:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

// Endpoint to handle updating the order_prep field in the orders table
app.put("/orders/:orderItemId", async (req, res) => {
	try {
		const { orderItemId, todoCount } = req.body;
		const orderItem = await OrderItem.findByPk(orderItemId);

		if (!orderItem) {
			return res.status(404).json({ error: "Order item not found" });
		}

		// Access the orderId from the retrieved OrderItem
		const order_id = orderItem.order_id;
		const order_prep = todoCount;
		// console.log("usii funcrion m hu ", todoCount);

		// Update the order_prep field in the orders table
		// console.log("aagya update order pre : ", order_prep);
		await Order.update({ order_prep }, { where: { id: order_id } });

		res.sendStatus(200); // Send a success status
	} catch (error) {
		console.error("Error updating order_prep:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

app.get("/orderItems/:id", menuItemController.getMenuItemById);
app.get("/orderItems", menuItemController.getMenuItems);
app.get("/orders/:id", menuItemController.getOrdersById);
// Table Routes
// 1. Get all tables
app.get("/api/tables", async (req, res) => {
	try {
		const tables = await Table.findAll({
			order: [
				["id", "ASC"], // Order by 'id' in ascending order
			],
		});
		res.json(tables);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// 2. Get a table by ID
app.get("/api/tables/:id", async (req, res) => {
	try {
		const table = await Table.findByPk(req.params.id);
		if (table) {
			res.json(table);
		} else {
			res.status(404).json({ message: "Table not found" });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.put("/api/tables/:id", async (req, res) => {
	try {
		const tableId = req.params.id;

		// Check and update based on request data
		const updateData = {};
		if (req.body.status) {
			updateData.status = req.body.status;
		}
		if (req.body.capacity) {
			updateData.capacity = req.body.capacity;
		}

		// Handle if no valid fields were to be updated
		if (Object.keys(updateData).length === 0) {
			return res.status(400).json({ message: "No valid fields to update" });
		}

		// Update the table using Sequelize
		const result = await Table.update(updateData, { where: { id: tableId } });

		// Handle if table was updated or not
		if (result[0] === 1) {
			// Successful update
			res.status(200).json({ message: "Table updated" });
		} else {
			res.status(404).json({ message: "Table not found" });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

//MENU ROUTES
app.get("/api/menu-items/:category?", async (req, res) => {
	// Change here
	try {
		const category = req.params.category;

		let whereClause = { available: true };

		if (category) {
			// Only apply filter if a category is provided
			whereClause.category = category;
		}

		const menuItems = await MenuItem.findAll({ where: whereClause });
		res.json(menuItems);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

//ORDERING MODULE ROUTES

app.post("/api/orders", async (req, res) => {
	try {
		const order = await Order.create(req.body);
		res.json(order);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.post("/api/order-items", async (req, res) => {
	try {
		// Consider a transaction here for data consistency
		const orderItem = await OrderItem.create(req.body);
		res.json(orderItem);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.put("/api/orders/:id", async (req, res) => {
	try {
		const orderId = req.params.id;
		const [updatedRowsCount] = await Order.update(req.body, {
			where: { id: orderId },
		});

		if (updatedRowsCount === 0) {
			return res.status(404).json({ message: "Order not found" });
		}

		res.status(200).json({ message: "Order updated" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

//notification
app.get("/api/orders/:order_id/status", async (req, res) => {
	try {
		const { order_id } = req.params;

		const orderItems = await OrderItem.findAll({ where: { order_id } });
		const allDone = orderItems.every((item) => item.status === "done");

		if (allDone) {
			// Retrieve table ID (assuming you have a relationship between Order and Table)
			const order = await Order.findByPk(order_id, {
				include: Table,
			});
			const table_id = order ? order.table.id : null;

			const notificationMessage = `Order ID: ${order_id}, Table ID: ${table_id} - Food ready to serve`;
			const currentTime = new Date().toLocaleString();

			res.json({ message: notificationMessage, updatedAt: currentTime });
		} else {
			// Order is not yet complete
			res.json({ orderComplete: false }); // Or any other response you prefer
		}
	} catch (error) {
		console.error("Error fetching order items and checking status:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

app.get("/api/orders/:orderId", async (req, res) => {
	try {
		const order = await Order.findByPk(req.params.orderId, {
			include: [OrderItem], // Include associated order items
		});
		if (order) {
			res.json(order);
		} else {
			res.status(404).json({ message: "Order not found" });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.get("/api/orders/table/:tableId", async (req, res) => {
	try {
		const tableId = req.params.tableId;
		const latestOrder = await Order.findOne({
			where: {
				table_id: tableId,
				status: { [Op.ne]: "Order Closed" },
			},
			include: OrderItem,
			order: [["id", "DESC"]],
		});

		if (latestOrder) {
			res.json(latestOrder);
		} else {
			res.status(404).json({ message: "Order not found for this table" });
		}
	} catch (error) {
		console.error("Error fetching order:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

app.put("/api/order-items/:id", async (req, res) => {
	try {
		const orderItemId = req.params.id;
		const newQuantity = req.body.quantity;

		// 1. Update OrderItem in database
		const [updatedRowsCount] = await OrderItem.update(
			{ quantity: newQuantity },
			{
				where: { id: orderItemId },
			}
		);

		if (updatedRowsCount === 0) {
			return res.status(404).json({ message: "Order item not found" });
		}

		// 2. (Optional) Recalculate order total on the backend as well
		const orderItem = await OrderItem.findByPk(orderItemId);
		const orderId = orderItem.order_id;

		const order = await Order.findByPk(orderId);

		const updatedOrderTotal = calculateOrderTotal(order); // Helper function (Implement this yourself)

		await Order.update(
			{ total_amount: updatedOrderTotal },
			{
				where: { id: orderId },
			}
		);

		res.status(200).json({ message: "Order item quantity updated" });
	} catch (error) {
		console.error("Error updating order item quantity:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

app.delete("/api/order-items/:id", async (req, res) => {
	try {
		const orderItemId = req.params.id;
		await OrderItem.destroy({ where: { id: orderItemId } });

		res.status(200).json({ message: "Order item deleted" });
	} catch (error) {
		console.error("Error deleting order item:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

app.put("/api/orders/:orderId/status", async (req, res) => {
	try {
		const id = req.params.orderId;
		const newStatus = req.body.status;
		const order = await Order.findByPk(id);
		if (!order) {
			return res.status(404).json({ message: "Order not found" });
		}
		await order.update({ status: newStatus });
		res.json(order);
	} catch (error) {
		console.error("Error updating order status:", error);
		res.status(500).json({ message: "Error updating order status" });
	}
});

// Table Routes
// 1. Get all tables
app.get("/api/tables", async (req, res) => {
	try {
		const tables = await Table.findAll({
			order: [
				["id", "ASC"], // Order by 'id' in ascending order
			],
		});
		res.json(tables);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// 2. Get a table by ID
app.get("/api/tables/:id", async (req, res) => {
	try {
		const table = await Table.findByPk(req.params.id);
		if (table) {
			res.json(table);
		} else {
			res.status(404).json({ message: "Table not found" });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.put("/api/tables/:id", async (req, res) => {
	try {
		const tableId = req.params.id;

		// Check and update based on request data
		const updateData = {};
		if (req.body.status) {
			updateData.status = req.body.status;
		}
		if (req.body.capacity) {
			updateData.capacity = req.body.capacity;
		}

		// Handle if no valid fields were to be updated
		if (Object.keys(updateData).length === 0) {
			return res.status(400).json({ message: "No valid fields to update" });
		}

		// Update the table using Sequelize
		const result = await Table.update(updateData, { where: { id: tableId } });

		// Handle if table was updated or not
		if (result[0] === 1) {
			// Successful update
			res.status(200).json({ message: "Table updated" });
		} else {
			res.status(404).json({ message: "Table not found" });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

//MENU ROUTES
app.get("/api/menu-items/:category?", async (req, res) => {
	// Change here
	try {
		const category = req.params.category;

		let whereClause = { available: true };

		if (category) {
			// Only apply filter if a category is provided
			whereClause.category = category;
		}

		const menuItems = await MenuItem.findAll({ where: whereClause });
		res.json(menuItems);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

//ORDERING MODULE ROUTES

app.post("/api/orders", async (req, res) => {
	try {
		const order = await Order.create(req.body);
		res.json(order);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.post("/api/order-items", async (req, res) => {
	try {
		// Consider a transaction here for data consistency
		const orderItem = await OrderItem.create(req.body);
		res.json(orderItem);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.put("/api/orders/:id", async (req, res) => {
	try {
		const orderId = req.params.id;
		const [updatedRowsCount] = await Order.update(req.body, {
			where: { id: orderId },
		});

		if (updatedRowsCount === 0) {
			return res.status(404).json({ message: "Order not found" });
		}

		res.status(200).json({ message: "Order updated" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

//notification
app.get("/api/orders/:order_id/status", async (req, res) => {
	try {
		const { order_id } = req.params;

		const orderItems = await OrderItem.findAll({ where: { order_id } });
		const allDone = orderItems.every((item) => item.status === "done");

		if (allDone) {
			// Retrieve table ID (assuming you have a relationship between Order and Table)
			const order = await Order.findByPk(order_id, {
				include: Table,
			});
			const table_id = order ? order.table.id : null;

			const notificationMessage = `Order ID: ${order_id}, Table ID: ${table_id} - Food ready to serve`;
			const currentTime = new Date().toLocaleString();

			res.json({ message: notificationMessage, updatedAt: currentTime });
		} else {
			// Order is not yet complete
			res.json({ orderComplete: false }); // Or any other response you prefer
		}
	} catch (error) {
		console.error("Error fetching order items and checking status:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

app.get("/api/orders/:orderId", async (req, res) => {
	try {
		const order = await Order.findByPk(req.params.orderId, {
			include: [OrderItem], // Include associated order items
		});
		if (order) {
			res.json(order);
		} else {
			res.status(404).json({ message: "Order not found" });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.get("/api/orders/table/:tableId", async (req, res) => {
	try {
		const tableId = req.params.tableId;
		const latestOrder = await Order.findOne({
			where: {
				table_id: tableId,
				status: { [Op.ne]: "Order Closed" },
			},
			include: OrderItem,
			order: [["id", "DESC"]],
		});

		if (latestOrder) {
			res.json(latestOrder);
		} else {
			res.status(404).json({ message: "Order not found for this table" });
		}
	} catch (error) {
		console.error("Error fetching order:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

app.put("/api/order-items/:id", async (req, res) => {
	try {
		const orderItemId = req.params.id;
		const newQuantity = req.body.quantity;

		// 1. Update OrderItem in database
		const [updatedRowsCount] = await OrderItem.update(
			{ quantity: newQuantity },
			{
				where: { id: orderItemId },
			}
		);

		if (updatedRowsCount === 0) {
			return res.status(404).json({ message: "Order item not found" });
		}

		// 2. (Optional) Recalculate order total on the backend as well
		const orderItem = await OrderItem.findByPk(orderItemId);
		const orderId = orderItem.order_id;

		const order = await Order.findByPk(orderId);

		const updatedOrderTotal = calculateOrderTotal(order); // Helper function (Implement this yourself)

		await Order.update(
			{ total_amount: updatedOrderTotal },
			{
				where: { id: orderId },
			}
		);

		res.status(200).json({ message: "Order item quantity updated" });
	} catch (error) {
		console.error("Error updating order item quantity:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

app.delete("/api/order-items/:id", async (req, res) => {
	try {
		const orderItemId = req.params.id;
		await OrderItem.destroy({ where: { id: orderItemId } });

		res.status(200).json({ message: "Order item deleted" });
	} catch (error) {
		console.error("Error deleting order item:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

app.put("/api/orders/:orderId/status", async (req, res) => {
	try {
		const id = req.params.orderId;
		const newStatus = req.body.status;
		const order = await Order.findByPk(id);
		if (!order) {
			return res.status(404).json({ message: "Order not found" });
		}
		await order.update({ status: newStatus });
		res.json(order);
	} catch (error) {
		console.error("Error updating order status:", error);
		res.status(500).json({ message: "Error updating order status" });
	}
});

module.exports = router;
