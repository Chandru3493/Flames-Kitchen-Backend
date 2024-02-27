const {DataTypes} = require('sequelize')
const {sequelize} = require('../db.js');
const Employee = require('./employee_data.js');

const Salary = sequelize.define('salaries',{
    empid:{
     type: DataTypes.INTEGER,
     primaryKey:true,
     allowNull:false,
     unique:true,
     autoIncrement:true,
     
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
      }
})



module.exports = Salary