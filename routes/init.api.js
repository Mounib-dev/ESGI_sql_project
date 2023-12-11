const router = require('express').Router();
const { getConnection } = require('../utils/config');
const { deleteAllProcedures, addProcedures, executeProcedure } = require('../utils/functions');

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


module.exports = router;