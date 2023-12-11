const http = require('node:http');
const express = require('express');
const fs = require('fs');
const hostname = '127.0.0.1';
const port = 3000;

const app = express();

// Create mysql connection
const { getConnection } = require('./utils/config');

const connection = getConnection();

connection.connect((error) => {
    if(error) console.log(error);
    else console.log('Connected to MySQL');
})

const router = require('./routes');

app.use(router);


app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});