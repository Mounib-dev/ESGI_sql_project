const http = require('node:http');
const express = require('express');
const fs = require('fs');
const hostname = '127.0.0.1';
const port = 3000;

var data = require("./data.json")

const app = express();
require('dotenv').config();

const dbConfig = {
    host: 'localhost',
    user: 'root',
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD || null
}

// Create mysql connection
const mysql = require('mysql2');
const db = mysql.createConnection(dbConfig);
// Connect db to the server
db.connect(err => {
    if (err) throw err;
    console.log("DB connected to the server");
})


// PROCEDURE INSERT

const cheminProcedureSQL = './sql/insert_artiste.sql';

// Lecture du fichier SQL
    fs.readFile(cheminProcedureSQL, 'utf8', (err, data) => {
        if (err) {
            console.error('Erreur lors de la lecture du fichier SQL : ' + err.stack);
            // res.status(500).send('Erreur lors de la lecture du fichier SQL');
            return;
        }

        // PROCEDURE INSERT CREATION
        db.query(data, (err, result) => {
            if (err) {
                console.error('Erreur lors de l\'appel de la procédure stockée : ' + err.stack);
                // res.status(500).send('Erreur lors de l\'appel de la procédure stockée');
                return;
            }
                });

        // PROCEDURE INSERT EXECUTION
        const insertArtisteProcedure = 'CALL insert_artiste(?, ?, ?)';
        const valeursParametres = ['NomAppel', "19-11-2023", 'NationaliteAppel'];
        db.query(insertArtisteProcedure, valeursParametres, (err, result) => {
            if (err) {
                console.error('Erreur lors de l\'appel de la procédure stockée : ' + err.stack);
                // res.status(500).send('Erreur lors de l\'appel de la procédure stockée');
                return;
            }
        });
    });



// app.get('/initdb', async(req, res) => {
//     //! Not working for the moment;
//     // const createSQL = fs.readFileSync('./sql/create.sql', 'utf8');
//     // db.query(createSQL);
//     db.query('CALL create_db()')
// })

// Endpoint insert JSON
app.get('/insert-json-data-test', (req, res) => {
    // Lecture du fichier JSON

    console.log(data.artiste);
      try {
        // const dataToInsert = JSON.parse(data);
        // console.log(dataToInsert);
        // Construction de la requête SQL INSERT
        const scriptSQL = 'INSERT INTO artiste (nom, date_de_naissance, nationalite) VALUES ?';
  
        // Exécution de la requête SQL
        db.query(scriptSQL, [data.artiste.map(obj => [obj.nom, obj.date_de_naissance, obj.nationalite])], (err, result) => {
          if (err) {
            console.error('Erreur lors de l\'opération d\'INSERT : ' + err.stack);
            res.status(500).send('Erreur lors de l\'opération d\'INSERT');
            return;
          }
  
          // Renvoyer une réponse réussie avec le nombre d'éléments insérés
          res.json({ nombreElementsInseres: result.affectedRows });
        });
      } catch (error) {
        console.error('Erreur lors de la conversion des données JSON : ' + error.stack);
        res.status(500).send('Erreur lors de la conversion des données JSON');
      }
    });


app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});