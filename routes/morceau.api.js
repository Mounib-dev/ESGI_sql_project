const router = require('express').Router();
const { executeQuery, executeProcedureWithParams } = require('../utils/functions');

router.get('', async(req, res) => {
    try {
        const result = await executeQuery('SELECT * FROM morceau');
        res.send(result)
    } catch(e) {
        res.status(500).send({ error: e });
    }
})

router.get('/:id', async(req, res) => {
    try {
        const result = await executeQuery(`SELECT * FROM morceau WHERE id = ${req.params.id}`);
        if(result.length === 0) return res.status(404).send({ error: 'Not found' });

        res.send(result);
    } catch(e) {
        console.log('entering catch')
        res.status(500).send({ error: e })
    }
})

router.post('/create', async(req, res) => {
    try {
        const { titre, duree, date_sortie, id_artiste, id_categorie } = req.body;
        let query = '';
        if(!id_categorie) {
            query = `INSERT INTO morceau (titre, duree, date_sortie, id_artiste) VALUES ('${titre}', ${duree}, '${date_sortie}', ${id_artiste})`;
        } else {
            query = `INSERT INTO morceau (titre, duree, date_sortie, id_artiste, id_categorie) VALUES ('${titre}', ${duree}, '${date_sortie}', ${id_artiste}, ${id_categorie})`;
        }
        const result = await executeQuery(query);

        res.send(result);
    } catch(e) {
        res.status(500).send({ error: e });
    }
})

router.post('/addTrackToAlbum/:id', async(req, res) => {
    try {
        const { titre, duree, date_sortie, id_category } = req.body;
        const id_album = req.params.id;

        const result = await executeProcedureWithParams('AddTrackToAlbum', `'${titre}', ${duree}, '${date_sortie}', ${id_album}, ${id_category}`);

        res.send(result);
    } catch(e) {
        res.status(500).send({ error: e });
    }
})

router.post('/update/:id', async(req, res) => {
    try {
        const { titre, duree, date_sortie, id_artiste } = req.body;

        const id_album = req.body.id_album ?? null;
        const id_categorie = req.body.id_categorie ?? null;

        const id = req.params.id;
        const query = `UPDATE morceau SET titre = '${titre}', duree = ${duree}, date_sortie = '${date_sortie}', id_artiste = ${id_artiste}, id_categorie = ${id_categorie}, id_album = ${id_album} WHERE id = ${id}`;

        const result = await executeQuery(query);

        res.send(result);
    } catch(e) {
        res.status(500).send({ error: e });
    }
})

router.delete('/delete/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const result = await executeQuery(`DELETE FROM morceau WHERE id = ${id}`);

        res.send(result);
    } catch(e) {
        res.status(500).send({ error: e })
    }
})

module.exports = router;