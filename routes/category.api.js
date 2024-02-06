const router = require("express").Router();
const { json } = require("express");
const { getConnection } = require("../utils/config");
const { executeQuery } = require("../utils/functions");

const db = getConnection();

router.post("/create", (req, res) => {
    const name = req.body.name;

    executeQuery(`INSERT INTO categorie (nom) VALUES ('${name}')`)
        .then((response) => {
            return res.status(200).send(
                `<h2>Nouvelle catégorie correctement ajoutée:
        ${JSON.stringify(response)}
        </h2>`
            );
        })
        .catch((err) => {
            console.log(err);
            return res
                .status(409)
                .send("<h2>La catégorie que vous essayez d'ajouter existe déjà.</h2>");
        });
});

router.get("/read", (req, res) => {
    executeQuery(`SELECT * FROM categorie`)
        .then((response) => {
            const jsonReponse = JSON.stringify(response);
            return res.status(200).send(
                `<h2>
        Lecture réussie:
        ${jsonReponse}
        </h2>`
            );
        })
        .catch((err) => {
            return res
                .status(404)
                .send("<h2>Lecture impossible, veuillez réessayer.</h2>");
        });
});

router.post("/update/:id", (req, res) => {
    const name = req.body.name;
    const id = req.params.id;
    executeQuery(`UPDATE categorie SET nom = '${name}'WHERE id = ${id}`)
        .then(() => {
            return res.status(200).send("<h2>La catégorie a bien été modifiée</h2>");
        })
        .catch((err) => {
            console.log(err.message);
            return res.status(409).send("<h2>Cette catégorie existe déjà.</h2>");
        });
});

router.post("/delete/:id", (req, res) => {
    const id = req.params.id;
    executeQuery(`DELETE FROM categorie WHERE id = ${id}`)
        .then(() => {
            return res
                .status(200)
                .send(
                    "<h2>La catégorie a bien été supprimée, les morceaux ayant cette catégorie ne seront plus catégorisés</h2>"
                );
        })
        .catch((err) => {
            console.log(err.message);
            return res
                .status(500)
                .send("<h2>Une erreur est survenue, veuillez réessayer</h2>");
        });
});

module.exports = router;
