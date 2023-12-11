const router = require('express').Router();
const { getConnection } = require('../utils/config');
const { deleteAllProcedures, addProcedures, executeProcedure, addTriggers, deleteAllTriggers } = require('../utils/functions');

const connection = getConnection();

router.get('/initdb', async (req, res) => {
    try {
        await executeProcedure('CleanDB');
        await executeProcedure('CreateDB');
        await executeProcedure('InsertData');
        await deleteAllProcedures();
        await addProcedures();
        await deleteAllTriggers();
        await addTriggers();

        res.status(200).send("<h1>Success</h1>");
    } catch (error) {
        console.error('Error initializing database:', error);
        res.status(500).send("<h1>Error initializing database</h1>");
    }
});

// router.get('/call', async(req, res) => {
//     executeProcedure('CleanDB')
//     .then(() => executeProcedure('CreateDB'))
//     .then(() => executeProcedure('InsertData'))
// })


// router.get('/delete-categorie', async (req, res) => {
    
// })


module.exports = router;