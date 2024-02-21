// models/financialDayData.js

const { DataTypes } = require('sequelize');
const {sequelize} = require('../db.js');

const FinancialDay = sequelize.define('financial_day_data', {
  date: {
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
  },
});

module.exports = FinancialDay;
