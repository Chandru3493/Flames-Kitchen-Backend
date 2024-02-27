'use strict';
const {DataTypes} = require('sequelize')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.createTable('salaries',  {
       empid:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      allowNull:false,
      unique:true,
      autoIncrement:true,
      references:{
         model: 'employee_data',
         key: 'id'
      }
     },
     emp_salary: {
         type:DataTypes.INTEGER,
         allowNull:false,
 
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
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
