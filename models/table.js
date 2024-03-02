const {DataTypes}= require('sequelize');
const {sequelize}= require('../db.js');
const Order = require('./order.js');

const Table = sequelize.define("Table", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
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
  });

  //Table.hasOne(Order,{foreignKey: 'table_id'})

  module.exports = Table;
