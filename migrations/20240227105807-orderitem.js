'use strict';
const {DataTypes} = require('sequelize')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
   await queryInterface.createTable('OrderItems', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'Orders',
        key: 'id'
      }
    },
    menu_item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,references:{
        model: 'MenuItems',
        key: 'id'
      }
    },
     cook_id: { type: DataTypes.INTEGER, allowNull: true,references: { model: 'employee_data', key: 'id' }}
     ,status: { type: DataTypes.STRING, allowNull: false, },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    
    price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },createdAt: {
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
    },});
     
  },

  async down (queryInterface, Sequelize) {
    
      await queryInterface.dropTable('OrderItems');
     
  }
};
