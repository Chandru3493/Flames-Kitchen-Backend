const {DataTypes}= require('sequelize');
const {sequelize}= require('../db.js');
const MenuItem = require('./menu.js');
const Order = require('./order.js');

const OrderItem = sequelize.define('OrderItem', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      
    },
    menu_item_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    
    price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
  });

  OrderItem.belongsTo(Order,{foreignKey: 'order_id'})
  OrderItem.belongsTo(MenuItem, {foreignKey : 'menu_item_id'})

  module.exports = OrderItem