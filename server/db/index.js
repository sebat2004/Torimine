const db = require("pg");
require("dotenv").config();

const pool = new db.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: 5432,
    password: process.env.DB_PASSWORD,
    ssl: true
}); 

module.exports = {
    query: (text, params) => pool.query(text, params),
};
