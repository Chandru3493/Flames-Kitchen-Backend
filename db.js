const dbhost= "localhost"
const {Pool} = require('pg')

const pool = new Pool({
    user : "postgres",
    host : dbhost,
    database : "flameskitchen",
    password : "iamanurag12345",
    port: 5432
})

module.exports = pool;