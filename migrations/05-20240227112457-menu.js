'use strict';
const {DataTypes} = require('sequelize')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.createTable('MenuItem', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        category: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        available: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
      });
     
  },

  async down (queryInterface, Sequelize) {
    
    
     await queryInterface.dropTable('MenuItem');
     
  }
};
