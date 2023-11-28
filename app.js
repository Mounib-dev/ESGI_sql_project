const http = require('node:http');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
});

require('dotenv').config();

// Create mysql connection
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD || null
});

connection.connect((error) => {
    if(error) {
        console.error(error);
        return
    }

    console.log('Connected to the MySQL server.');

    connection.query('select * from test', (error, results) => {
        console.log(results);

        connection.end();
    });
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});