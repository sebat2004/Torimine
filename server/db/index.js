const db = require('pg');
require("dotenv").config();
 
const pool = new db.Pool();
 
module.exports = {
    query: (text, params) => pool.query(text, params),
};
