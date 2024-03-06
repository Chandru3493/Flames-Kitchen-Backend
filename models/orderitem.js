const {DataTypes}= require('sequelize');
const {sequelize}= require('../db.js');


const OrderItem = sequelize.define('orderitems', {
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
      allowNull: false,
     
    },
    cook_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    }
    ,
    
    price: {
      type: DataTypes.DECIMAL(10,2),
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

  

  module.exports = OrderItem
