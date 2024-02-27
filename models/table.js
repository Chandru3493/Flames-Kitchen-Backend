const {DataTypes}= require('sequelize');
const {sequelize}= require('../db.js');
const Order = require('./order.js');

const Table = sequelize.define('Table', {
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
  });

  Table.hasMany(Order,{foreignKey: 'table_id'})

  module.exports = Table;
