const fs = require('fs');
const { getConnection } = require('../utils/config');

const connection = getConnection();

// Execute a query
const executeQuery = (query) => {
    return new Promise((resolve, reject) => {
        connection.query(query, (error, result) => {
            if (error) {
                console.error('Error executing query:', error);
                reject(error);
            } else {
                console.log('Result:', result);
                resolve(result);
            }
        });
    });
}

// Read a sql file and execute the query
//! No multiple queries in a file
const executeQueryFromFile = async (filepath) => {
    const relativePath = `./sql/${filepath}`;
    fs.readFile(relativePath, 'utf-8', async (error, data) => {
        if(error) {
            console.log(error);
            return;
        }
        
        await executeQuery(data);
    });
}

module.exports = {
    executeQuery,
    executeQueryFromFile
}