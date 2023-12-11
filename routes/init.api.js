const router = require('express').Router();
const { getConnection } = require('../utils/config');
const { executeQueryFromFile, executeQuery } = require('../utils/functions');

const connection = getConnection();

router.get('/initdb', async(req, res) => {
    await deleteAllProcedures();
    await addProcedures();

})

router.get('/call', async(req, res) => {
    executeProcedure('CleanDB')
    .then(() => executeProcedure('CreateDB'))
    .then(() => executeProcedure('InsertData'))
})

async function addProcedures() {
    await executeQueryFromFile('procedures/cleanDB.sql');
    await executeQueryFromFile('procedures/createDB.sql');
    await executeQueryFromFile('procedures/insertData.sql');
}

async function executeProcedure(procedureName) {
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

async function deleteAllProcedures() {
    await executeQuery('DROP PROCEDURE IF EXISTS CleanDB;');
    await executeQuery('DROP PROCEDURE IF EXISTS CreateDB;');
    await executeQuery('DROP PROCEDURE IF EXISTS InsertData;');
    await executeQuery('DROP PROCEDURE IF EXISTS DeleteCategory;');
}

module.exports = router;