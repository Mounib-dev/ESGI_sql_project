const router = require("express").Router();
const { json } = require("express");
const { getConnection } = require("../utils/config");
const { executeQuery } = require("../utils/functions");

const db = getConnection();

router.post("/create", (req, res) => {
  const { name, date_of_birth, nationality } = req.body;
  executeQuery(
    `INSERT INTO artiste (nom, date_de_naissance, nationalite) VALUES ('${name}', '${date_of_birth}', '${nationality}')`
  )
    .then(() => {
      return res
        .status(200)
        .send("<h2>Nouveau artiste correctement ajouté</h2>");
    })
    .catch((err) => {
      if (err.message === "Date de naissance non valide") {
        return res.status(422).send(`<h2>${err.message}</h2>`);
      }
      return res
        .status(409)
        .send("<h2>Le nom que vous avez entré existe déjà</h2>");
    });
});

router.get("/read", (req, res) => {
  executeQuery(`SELECT * FROM artiste`)
    .then((response) => {
      const jsonResponse = JSON.stringify(response);
      return res.status(200).send(
        `<h2>
      Lecture réussie :
      ${jsonResponse}
      </h2>`
      );
    })
    .catch((err) => {
      console.log(err.message);
      return res
        .status(500)
        .send("<h2>Un problème est survenu, veuillez réessayer.</h2>");
    });
});

router.post("/update/:id", (req, res) => {
  const { name, date_of_birth, nationality } = req.body;
  const id = req.params.id;
  console.log(name);
  console.log(date_of_birth);
  console.log(nationality);
  executeQuery(
    `UPDATE artiste SET nom = '${name}', date_de_naissance = '${date_of_birth}', nationalite = '${nationality}' WHERE id = ${id}`
  )
    .then(() => {
      return res.status(200).send("<h2>Modifications prises en compte</h2>");
    })
    .catch((err) => {
      console.log(err.message);
      return res.status(400).send(`<h2>${err.message}</h2>`);
    });
});

router.post("/delete/:id", (req, res) => {
  const id = req.params.id;
  executeQuery(`DELETE FROM artiste WHERE id = ${id}`)
    .then((response) => {
      return res.status(200).send(
        `<h2>
        L'artiste a bien été supprimé :
        ${JSON.stringify(response)}
        </h2>`
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
