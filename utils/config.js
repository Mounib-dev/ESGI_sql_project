require('dotenv').config();
const dbConfig = {
    host: 'localhost',
    user: 'root',
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD || null
}


const mysql = require('mysql2');
const connection = mysql.createConnection(dbConfig);

const getConnection = () => {
    return connection;
}

module.exports = {
    getConnection
}
