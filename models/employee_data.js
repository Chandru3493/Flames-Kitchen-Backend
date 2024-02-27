const {DataTypes} = require('sequelize');
const {sequelize} = require('../db.js');
const Role = require('./role.js')
const Salary = require('./salary.js'); 


const Employee =sequelize.define('employee_data', {
  id: {
  type: DataTypes.INTEGER,
  allowNull: false,
  unique: true,
  autoIncrement: true,
  primaryKey:true
},
    
    email_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    roleId: {
      type: DataTypes.INTEGER,
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
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }}
  )
  Employee.belongsTo(Role, { foreignKey: 'roleId' });
  Employee.hasOne(Salary, { foreignKey: 'empid' });
;




module.exports = Employee;
