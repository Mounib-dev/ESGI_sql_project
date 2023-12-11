const router = require('express').Router();
const { getConnection } = require('../utils/config');
const { deleteAllProcedures, addProcedures, executeProcedure, addTriggers, deleteAllTriggers } = require('../utils/functions');

const connection = getConnection();

router.get('/initdb', (req, res) => {
    deleteAllProcedures()
        .then(() => addProcedures())
        .then(() => deleteAllTriggers())
        .then(() => addTriggers())
        .then(() => executeProcedure('CleanDB'))
        .then(() => executeProcedure('CreateDB'))
        .then(() => executeProcedure('InsertData'))
        .then (result => {
            res.status(200).send("<h1>Success</h1>");
        })
    

})

// router.get('/call', async(req, res) => {
//     executeProcedure('CleanDB')
//     .then(() => executeProcedure('CreateDB'))
//     .then(() => executeProcedure('InsertData'))
// })


// router.get('/delete-categorie', async (req, res) => {
    
// })


module.exports = router;