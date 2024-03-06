const {sequelize} = require('../db.js');
const {DataTypes} = require('sequelize');

const Transaction = sequelize.define('transactions',{id:{
  type:DataTypes.INTEGER,
  autoIncrement: true,
  primaryKey:true,
  allowNull:false
},
    date: {
        type: DataTypes.STRING,
        allowNull: false
      },
      time: {
        type: DataTypes.STRING,
        allowNull: false
      },
      mode: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      refid: {
        type: DataTypes.STRING,
        allowNull: false
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      sum: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      items: {
        type: DataTypes.ARRAY(DataTypes.STRING), 
        allowNull: true 
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
      }}
    
)

module.exports=Transaction