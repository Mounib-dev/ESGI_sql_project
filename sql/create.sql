-- morceau, album, artiste et catégorie

CREATE TABLE morceau (
    id INT NOT NULL PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    duree INT NOT NULL,
    date_sortie DATE NOT NULL,
    id_artiste INT NOT NULL,
    id_categorie INT,
    FOREIGN KEY (id_artiste) REFERENCES artiste(id) ON DELETE CASCADE,
    FOREIGN KEY (id_categorie) REFERENCES categorie(id)
);

CREATE TABLE artiste (
    id INT NOT NULL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    date_de_naissance DATE,
    nationalite VARCHAR(10)
);

CREATE TABLE categorie (
    id INT NOT NULL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL
);

CREATE TABLE album (
    id INT NOT NULL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    ids_morceau INT ARRAY NOT NULL,
    id_artiste INT NOT NULL,
    FOREIGN KEY (ids_morceau) REFERENCES morceau(id) ON DELETE CASCADE,
    FOREIGN KEY (id_artiste) RERERENCES artiste(id)
);

