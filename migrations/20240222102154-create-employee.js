'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING
      },
      email: {
        allowNUll: false,
        type: DataTypes.STRING
      },
      role: {
        allowNull: false,
        type: DataTypes.STRING
      },
      salary: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      createdAt: {
        
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('employees');
  }
};