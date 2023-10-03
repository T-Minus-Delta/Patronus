const mysql = require('mysql2');
const util = require("util");
require('dotenv').config();

const { DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME } = process.env;

const db = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    namedPlaceholders: true,
});

module.exports = db.promise()