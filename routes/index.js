const router = require("express").Router();
const initApi = require("./init.api");
const morceauApi = require('./morceau.api');
const artisteApi = require("./artiste.api");
const categoryApi = require("./category.api");

router.use('/init', initApi);

router.use("/artiste", artisteApi);
router.use("/category", categoryApi);
router.use('/morceaux', morceauApi);

module.exports = router;