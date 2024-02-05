-- Create the "music" database
CREATE PROCEDURE IF NOT EXISTS CreateDB()
BEGIN
    -- Create the "artiste" table
    CREATE TABLE IF NOT EXISTS artiste (
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        nom VARCHAR(255) UNIQUE NOT NULL,
        date_de_naissance DATE,
        nationalite VARCHAR(10)
    );

    -- Create the "categorie" table
    CREATE TABLE IF NOT EXISTS categorie (
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        nom VARCHAR(100) UNIQUE NOT NULL
    );

    -- Create the "album" table
    CREATE TABLE IF NOT EXISTS album (
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        nom VARCHAR(255) UNIQUE NOT NULL,
        id_artiste INT NOT NULL,
        FOREIGN KEY (id_artiste) REFERENCES artiste(id) ON DELETE CASCADE
    );
    
    -- Create the "morceau" table
    CREATE TABLE IF NOT EXISTS morceau (
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        titre VARCHAR(255) NOT NULL,
        duree INT NOT NULL,
        date_sortie DATE NOT NULL,
        id_artiste INT NOT NULL,
        id_categorie INT,
        id_album INT,
        FOREIGN KEY (id_artiste) REFERENCES artiste(id) ON DELETE CASCADE,
        FOREIGN KEY (id_categorie) REFERENCES categorie(id),
        FOREIGN KEY (id_album) REFERENCES album(id) ON DELETE CASCADE
    );
END;