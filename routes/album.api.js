const router = require('express').Router();
const { executeQuery } = require('../utils/functions');

router.get('', async(req, res) => {
    try {
        const result = await executeQuery('SELECT * FROM album');
        res.send(result);
    } catch(e) {
        res.status(500).send({ error: e });
    }
})

router.get('/:id', async(req, res) => {
    try {
        const result = await executeQuery(`SELECT * FROM album WHERE id = ${req.params.id}`)
        res.send(result);
    } catch(e) {
        res.status(500).send({ error: e });
    }
})

router.post('/create', async(req, res) => {
    try {
        const { nom, id_artiste } = req.body;
        const result = await executeQuery(`INSERT INTO album (nom, id_artiste) VALUES ('${nom}', ${id_artiste})`);

        res.send(result);
    } catch(e) {
        res.status(500).send({ error: e });
    }
})

router.post('/update/:id', async(req, res) => {
    try {
        const { nom, id_artiste } = req.body;
        const id = req.params.id;
        const result = await executeQuery(`UPDATE album SET nom = '${nom}', id_artiste = ${id_artiste} WHERE id = ${id}`);

        res.send(result);
    } catch(e) {
        res.status(500).send({ error: e });
    }
})

router.delete('/delete/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const result = await executeQuery(`DELETE FROM album WHERE id = ${id}`);

        res.send(result);
    } catch(e) {
        res.status(500).send({ error: e });
    }
})

module.exports = router;