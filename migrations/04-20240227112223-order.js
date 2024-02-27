'use strict';
const {DataTypes} = require('sequelize')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.createTable('Order', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      table_id: {
        type: DataTypes.INTEGER,
        allowNull: false,references: {
          model: 'Table',
          key: 'id'
        }
      },
      waiter_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'employee_data',
          key: 'id'
      }},
      cook_id: {
        type: DataTypes.INTEGER,
        allowNull: true,references: {
          model: 'employee_data',
          key: 'id'
      }},
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
      }})
    
  },

  async down (queryInterface, Sequelize) {
    
      await queryInterface.dropTable('Order');
     
  }
};
