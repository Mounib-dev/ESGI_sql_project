const router = require("express").Router();
const { json } = require("express");
const { getConnection } = require("../utils/config");
const { executeQuery } = require("../utils/functions");

const db = getConnection();

router.post("/create", (req, res) => {
  console.log(req.body);
  console.log(req.body.name);
  const { name, birth_date, nationality } = req.body;

  executeQuery(
    `INSERT INTO artiste (nom, date_de_naissance, nationalite) VALUES ('${name}', '${birth_date}', '${nationality}')`
  )
    .then(() => {
      return res
        .status(200)
        .send("<h2>Nouveau artiste correctement ajouté</h2>");
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(409)
        .send("<h2>Le nom que vous avez entré existe déjà</h2>");
    });
});

router.get("/read", (req, res) => {
  executeQuery(`SELECT * FROM artiste`)
    .then(() => {
      return res.status(200).send("<h2>Lecture réussie</h2>");
    })
    .catch((err) => {
      return res.status(404).send("<h2>Ajout erronné</h2>");
    });
});

router.post("/update", (req, res) => {
  const { name, birth_date, nationality } = req.body;
  console.log(name);
  console.log(birth_date);
  console.log(nationality);
  executeQuery(
    `UPDATE artiste SET nom = '${name}', date_de_naissance = '${birth_date}', nationalite = '${nationality}' WHERE id = 4`
  )
    .then(() => {
      return res.status(200).send("<h2>Modifications prises en compte</h2>");
    })
    .catch((err) => {
      console.log(err.message);
      return res
        .status(400)
        .send(
          "<h2>Une erreur est survenue, vous ne pouvez pas modifier la nationalité d'un artiste</h2>"
        );
    });
});

router.post("/delete", (req, res) => {
  const id = req.body.id;
  executeQuery(`DELETE FROM artiste WHERE id = ${id}`)
    .then(() => {
      return res.status(200).send("<h2>L'artiste a bien été supprimé</h2>");
    })
    .catch((err) => {
      console.log(err.message);
      return res
        .status(500)
        .send("<h2>Une erreur est survenue, veuillez réessayer</h2>");
    });
});

module.exports = router;
