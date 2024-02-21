'use strict';
const {DataTypes} = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     
     await queryInterface.createTable('financial_day_data', {date: {
      type: DataTypes.STRING,
      allowNull: false
    },
    starting_balance: {
      type: DataTypes.INTEGER,
      allowNull: false
    }, createdAt: {
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
    }});
     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('financial_day_data');
  }
};
