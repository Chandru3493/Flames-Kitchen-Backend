const express = require('express');
const cors = require('cors');


const { sequelize } = require('./db.js');




const app = express();
const port = 3002;

const {Op}= require('sequelize');
const AnuragEmp= require('./models/employee_data.js');

const FinancialDay =require('./models/financial_day_data.js');
const Transaction = require('./models/transactions.js');
const Role =  require('./models/role.js')
const Salary = require('./models/salary.js');
const MenuItem = require('./models/menu.js');
const OrderItem = require('./models/orderitem.js');
const Order = require('./models/order.js');
const Table = require('./models/table.js');


AnuragEmp.belongsTo(Role,{targetKey:'roleid',foreignKey: 'roleId'});
AnuragEmp.hasOne(Salary,{sourceKey:'id',foreignKey: 'empid'});
Order.hasOne(AnuragEmp,{sourceKey: 'waiter_id',foreignKey:'id'})
Order.hasMany(OrderItem,{sourceKey:'id',foreignKey: 'order_id'})
Order.belongsTo(Table,{foreignKey: 'table_id',targetKey:'id'});
 OrderItem.belongsTo(MenuItem,{ foreignKey: 'menu_item_id', targetKey:'id'});
MenuItem.hasOne(OrderItem,{sourceKey: 'id',foreignKey:'menu_item_id'});
OrderItem.hasOne(AnuragEmp,{sourceKey: 'cook_id',foreignKey:'id'});




(async () => {
  await sequelize.sync({ logging: false, force: false });
  console.log('Tables synchronized successfully');
})();

app.use(express.json());
app.use(cors());

// Table Routes
// 1. Get all tables
app.get('/api/tables', async (req, res) => {
  try {
    const tables = await Table.findAll({
      order: [
        ['id', 'ASC'] // Order by 'id' in ascending order
      ]
    });
    res.json(tables);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 2. Get a table by ID
app.get('/api/tables/:id', async (req, res) => {
  try {
    const table = await Table.findByPk(req.params.id);
    if (table) {
      res.json(table);
    } else {
      res.status(404).json({ message: 'Table not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/tables/:id', async (req, res) => {
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
       return res.status(400).json({ message: 'No valid fields to update' }); 
    }

    // Update the table using Sequelize
    const result = await Table.update(
      updateData, 
      { where: { id: tableId } }
    );

    // Handle if table was updated or not
    if (result[0] === 1) { // Successful update
      res.status(200).json({ message: 'Table updated' }); 
    } else {
      res.status(404).json({ message: 'Table not found' });
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//MENU ROUTES
app.get('/api/menu-items/:category?', async (req, res) => { // Change here
  try {
    const category = req.params.category; 

    let whereClause = { available: true }; 

    if (category) { // Only apply filter if a category is provided
      whereClause.category = category; 
    }

    const menuItems = await MenuItem.findAll({ where: whereClause });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//ORDERING MODULE ROUTES 

app.post('/api/orders', async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.json(order); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/order-items', async (req, res) => {
  try {
    // Consider a transaction here for data consistency
    const orderItem = await OrderItem.create(req.body);
    res.json(orderItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/orders/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    const [updatedRowsCount] = await Order.update(req.body, { where: { id: orderId } });

    if (updatedRowsCount === 0) {
      return res.status(404).json({ message: 'Order not found' }); 
    }

    res.status(200).json({ message: 'Order updated' }); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//notification 
app.get('/api/orders/:order_id/status', async (req, res) => {
  try {
    const { order_id } = req.params;

    const orderItems = await OrderItem.findAll({ where: { order_id } });
    const allDone = orderItems.every(item => item.status === 'done'); 

    if (allDone) {
      // Retrieve table ID (assuming you have a relationship between Order and Table)
      const order = await Order.findByPk(order_id, { 
        include: Table 
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
    console.error('Error fetching order items and checking status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/orders/:orderId', async (req, res) => {
  try {
      const order = await Order.findByPk(req.params.orderId, {
          include: [OrderItem] // Include associated order items
      });
      if (order) {
          res.json(order);
      } else {
          res.status(404).json({ message: 'Order not found' });
      }
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

app.get('/api/orders/table/:tableId', async (req, res) => {
  try {
      const tableId = req.params.tableId;
      const latestOrder = await Order.findOne({
          where: {
              table_id: tableId,
              status: { [Op.ne]: 'Order Closed' } 
          },
          include: OrderItem,  
          order: [['id', 'DESC']]
      });

      if (latestOrder) {
          res.json(latestOrder);
      } else {
          res.status(404).json({ message: 'Order not found for this table' });
      }
  } catch (error) {
      console.error('Error fetching order:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/api/order-items/:id', async (req, res) => {
  try {
      const orderItemId = req.params.id;
      const newQuantity = req.body.quantity;

      // 1. Update OrderItem in database
      const [updatedRowsCount] = await OrderItem.update({ quantity: newQuantity }, {
          where: { id: orderItemId }
      });

      if (updatedRowsCount === 0) {
          return res.status(404).json({ message: 'Order item not found' });
      }

      // 2. (Optional) Recalculate order total on the backend as well
      const orderItem = await OrderItem.findByPk(orderItemId); 
      const orderId = orderItem.order_id;

      const order = await Order.findByPk(orderId);  

      const updatedOrderTotal = calculateOrderTotal(order); // Helper function (Implement this yourself)

      await Order.update({ total_amount: updatedOrderTotal }, { 
          where: { id: orderId }
      });

      res.status(200).json({ message: 'Order item quantity updated' });
  } catch (error) {
      console.error('Error updating order item quantity:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/api/order-items/:id', async (req, res) => {
  try {
      const orderItemId = req.params.id;
      await OrderItem.destroy({ where: { id: orderItemId } });

      res.status(200).json({ message: 'Order item deleted' });
  } catch (error) {
      console.error('Error deleting order item:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/api/orders/:orderId/status', async (req, res) => {
  try {
    const id = req.params.orderId; 
    const newStatus = req.body.status;
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    await order.update({ status: newStatus });
    res.json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Error updating order status' });
  }
});


app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
