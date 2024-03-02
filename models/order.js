const {sequelize} = require('../db.js');
const {DataTypes} = require('sequelize');

const Table = require('./table.js')
const Employee = require('./employee_data.js');
//const OrderItem = require('./orderitem.js');

const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    table_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    waiter_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    
    order_time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
  });

  Order.belongsTo(Table,{foreignKey:'table_id'})
  //Order.belongsTo(Employee,{foreignKey: 'waiter_id'})
  
  //Order.hasMany(OrderItem,{foreignKey: 'order_id'})

  module.exports = Order
