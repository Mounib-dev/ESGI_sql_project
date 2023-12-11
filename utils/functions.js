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
const executeQueryFromFile = (filepath) => {
    return new Promise((resolve, reject) => {
        const relativePath = `./sql/${filepath}`;
        fs.readFile(relativePath, 'utf-8', async (error, data) => {
            if(error) {
                reject(error)
            }
            
            resolve(executeQuery(data));
        });
    })
}

const addProcedures = () => {
    executeQueryFromFile('procedures/cleanDB.sql')
    .then(() => executeQueryFromFile('procedures/createDB.sql'))
    .then(() => executeQueryFromFile('procedures/insertData.sql'))
}

const executeProcedure = (procedureName) => {
    return new Promise((resolve, reject) => {
        connection.query(`CALL ${procedureName}`, (error, result) => {
            if(error) {
                console.error('Error executing procedure:', error);
                reject(error);
            } else {
                resolve(result);
            }
        });
    })
}

const deleteAllProcedures = () => {
    return new Promise((resolve, reject) => { 
        
        executeQuery('DROP PROCEDURE IF EXISTS CleanDB;')
        .then(() => executeQuery('DROP PROCEDURE IF EXISTS CreateDB;'))
        .then(() => executeQuery('DROP PROCEDURE IF EXISTS InsertData;'))
        .then((error) => {
            if(error) reject(error);
            else resolve();
        });
    });
}

const addTriggers = () => {
    return new Promise((resolve, reject) => {
        executeQueryFromFile('triggers/deleteCategory.sql').then((error) => {
            if(error) reject(error);
            else resolve();
        })
    })
}

const deleteAllTriggers = () => {
    return new Promise((resolve) => {
        executeQuery('DROP TRIGGER IF EXISTS before_delete_trigger;')
        .then((error) => {
            if(error) reject(error);
            else resolve();
        });
    
    })
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