const router = require('express').Router();
const initApi = require('./init.api');
const morceauApi = require('./morceau.api');
const artisteApi = require("./artiste.api");
const categoryApi = require("./category.api");
const albumApi = require('./album.api');

router.use('/init', initApi);

router.use("/artiste", artisteApi);
router.use("/category", categoryApi);
router.use('/morceaux', morceauApi);
router.use('/albums', albumApi);

module.exports = router;