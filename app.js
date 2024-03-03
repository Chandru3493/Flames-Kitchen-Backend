const express = require('express');
const cors = require('cors');


const { sequelize } = require('./db.js');




const app = express();
const port = 4000;

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
MenuItem.hasOne(OrderItem,{sourceKey: 'id',foreignKey:'menu_item_id'});
OrderItem.hasOne(AnuragEmp,{sourceKey: 'cook_id',foreignKey:'id'});




(async () => {
  await sequelize.sync({ logging: false, force: false });
  console.log('Tables synchronized successfully');
})();

app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});