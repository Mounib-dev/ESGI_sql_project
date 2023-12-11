const router = require('express').Router();
const { getConnection } = require('../utils/config');
const { executeQueryFromFile } = require('../utils/functions');

const connection = getConnection();

router.get('/initdb', async(req, res) => {
    const deleteProcedureQuery = 'DROP PROCEDURE IF EXISTS insertData;';

    connection.query(deleteProcedureQuery, async(error, result) => {
        if(error) {
            console.log(error);
            return;
        }
    });

    await executeQueryFromFile('procedures/insertData.sql');
});



module.exports = router;