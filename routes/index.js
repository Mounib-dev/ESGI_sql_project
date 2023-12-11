const router = require('express').Router();
const initApi = require('./init.api');

router.use('/init', initApi);

module.exports = router;