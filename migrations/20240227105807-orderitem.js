'use strict';
const {DataTypes} = require('sequelize')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
   await queryInterface.createTable('OrderItem', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'Order',
        key: 'id'
      }
    },
    menu_item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,references:{
        model: 'MenuItem',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    
    price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    }});
     
  },

  async down (queryInterface, Sequelize) {
    
      await queryInterface.dropTable('OrderItem');
     
  }
};
