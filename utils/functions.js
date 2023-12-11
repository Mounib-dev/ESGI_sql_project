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

const addProcedures = async () => {
    await executeQueryFromFile('procedures/cleanDB.sql');
    await executeQueryFromFile('procedures/createDB.sql');
    await executeQueryFromFile('procedures/insertData.sql');
}

const executeProcedure = async (procedureName) => {
    return new Promise((resolve, reject) => {
        connection.query(`CALL ${procedureName}`, (error, result) => {
            if(error) {
                console.error('Error executing procedure:', error);
                reject(error);
            } else {
                console.log('Result:', result);
                resolve(result);
            }
        });
    })
}

const deleteAllProcedures = async () => {
    await executeQuery('DROP PROCEDURE IF EXISTS CleanDB;');
    await executeQuery('DROP PROCEDURE IF EXISTS CreateDB;');
    await executeQuery('DROP PROCEDURE IF EXISTS InsertData;');
}

const addTriggers = async () => {
    await executeQueryFromFile('triggers/deleteCategory.sql');
}

const deleteAllTriggers = async () => {
    await executeQuery('DROP TRIGGER IF EXISTS before_delete_trigger;');
}

module.exports = {
    executeQuery,
    executeQueryFromFile,
    addProcedures,
    executeProcedure,
    deleteAllProcedures,
    addTriggers,
    deleteAllTriggers
}