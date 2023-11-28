const http = require('node:http');
const express = require('express');
const fs = require('fs');
const hostname = '127.0.0.1';
const port = 3000;

const app = express();
require('dotenv').config();
const dbConfig = {
    host: 'localhost',
    user: 'root',
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD || null
}

// Create mysql connection
const mysql = require('mysql2');
const connection = mysql.createConnection(dbConfig);

app.get('/initdb', async(req, res) => {
    //! Not working for the moment;
    // const createSQL = fs.readFileSync('./sql/create.sql', 'utf8');
    // connection.query(createSQL);
    connection.query('CALL CreateMusicDatabase()')
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});