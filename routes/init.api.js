const router = require('express').Router();
const { getConnection } = require('../utils/config');
const { deleteAllProcedures, addProcedures, executeProcedure, addTriggers, deleteAllTriggers } = require('../utils/functions');

const connection = getConnection();

router.get('/initdb', async(req, res) => {
    await deleteAllProcedures();
    await addProcedures();

    await deleteAllTriggers();
    await addTriggers();

    res.redirect('./call');
})

router.get('/call', async(req, res) => {
    executeProcedure('CleanDB')
    .then(() => executeProcedure('CreateDB'))
    .then(() => executeProcedure('InsertData'))
})


router.get('/delete-categorie', async (req, res) => {
    
})


module.exports = router;