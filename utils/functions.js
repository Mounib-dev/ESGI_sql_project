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
                resolve(result);
            }
        });
    });
}

// Read a sql file and execute the query
//! No multiple queries in a file
const executeQueryFromFile = async (filepath) => {
    try {
        const relativePath = `./sql/${filepath}`;
        const result = fs.readFile(relativePath, 'utf-8', async (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                throw err;
            }
            return await executeQuery(data);
        });
        return result;
    } catch (error) {
        console.error('Error reading or executing query from file:', error);
        throw error;
    }
}

const addProcedures = async () => {
    try {
        await executeQueryFromFile('procedures/cleanDB.sql');
        await executeQueryFromFile('procedures/createDB.sql');
        await executeQueryFromFile('procedures/insertData.sql');
    } catch (error) {
        console.error('Error adding procedures:', error);
        throw error;
    }
}

const executeProcedure = (procedureName) => {
    return new Promise((resolve, reject) => {
        connection.query(`CALL ${procedureName}`, (error, result) => {
            if (error) {
                console.error('Error executing procedure:', error);
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

const deleteAllProcedures = async () => {
    try {
        await executeQuery('DROP PROCEDURE IF EXISTS CleanDB;');
        await executeQuery('DROP PROCEDURE IF EXISTS CreateDB;');
        await executeQuery('DROP PROCEDURE IF EXISTS InsertData;');
    } catch (error) {
        console.error('Error deleting procedures:', error);
        throw error;
    }
}

const addTriggers = async () => {
    try {
        await executeQueryFromFile('triggers/deleteCategory.sql');
        await executeQueryFromFile('triggers/artisteDefaultValueIfBlank.sql');
        await executeQueryFromFile('triggers/validBirthDate.sql');
        await executeQueryFromFile('triggers/artistNonModifiableNationality.sql');
    } catch (error) {
        console.error('Error adding triggers:', error);
        throw error;
    }
}

const deleteAllTriggers = async () => {
    try {
        await executeQuery('DROP TRIGGER IF EXISTS before_delete_trigger;');
        await executeQuery('DROP TRIGGER IF EXISTS before_insert_artist')
        await executeQuery('DROP TRIGGER IF EXISTS artist_valid_birth_date;');
        await executeQuery('DROP TRIGGER IF EXISTS before_update_artist;');
    } catch (error) {
        console.error('Error deleting triggers:', error);
        throw error;
    }
}

module.exports = {
    executeQuery,
    executeQueryFromFile,
    addProcedures,
    executeProcedure,
    deleteAllProcedures,
    addTriggers,
    deleteAllTriggers
};