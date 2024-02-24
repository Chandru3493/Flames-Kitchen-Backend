
// const dbhost = "localhost";
// const username = "postgres";
// const password = "iamanurag12345";
// const databaseName = "flameskitchen";
// const port = 5432;
const config = require('./config/config.json');

const environment = 'development'

const {Sequelize} = require('sequelize');
const sequelize = new Sequelize(config[environment]);






module.exports = {sequelize};