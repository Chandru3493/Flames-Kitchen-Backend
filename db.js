import pkg from 'pg';
const { Pool } = pkg;
const pool = new Pool({
    user: 'muhammedrasin',
    host: 'localhost',
    database: 'flameskitchen',
    password: '123',
    port: 5431 
});

export default pool;
