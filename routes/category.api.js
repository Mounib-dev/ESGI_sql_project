const router = require("express").Router();
const { json } = require("express");
const { getConnection } = require("../utils/config");
const { executeQuery } = require("../utils/functions");

const db = getConnection();

router.post("/create", (req, res) => {
  const name = req.body.name;

  executeQuery(`INSERT INTO categorie (nom) VALUES ('${name}')`)
    .then(() => {
      return res
        .status(200)
        .send("<h2>Nouvelle catégorie correctement ajoutée</h2>");
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
    .then(() => {
      return res.status(200).send("<h2>Lecture réussie</h2>");
    })
    .catch((err) => {
      return res
        .status(404)
        .send("<h2>Lecture impossible, veuillez réessayer.</h2>");
    });
});

router.post("/update", (req, res) => {
  const name = req.body.name;
  executeQuery(`UPDATE categorie SET nom = '${name}'WHERE id = 4`)
    .then(() => {
      return res.status(200).send("<h2>La catégorie a bien été modifiée</h2>");
    })
    .catch((err) => {
      console.log(err.message);
      return res.status(409).send("<h2>Cette catégorie existe déjà.</h2>");
    });
});

router.post("/delete", (req, res) => {
  const id = req.body.id;
  executeQuery(`DELETE FROM categorie WHERE id = ${id}`)
    .then(() => {
      return res.status(200).send("<h2>La catégorie a bien été supprimée</h2>");
    })
    .catch((err) => {
      console.log(err.message);
      return res
        .status(500)
        .send("<h2>Une erreur est survenue, veuillez réessayer</h2>");
    });
});

module.exports = router;
