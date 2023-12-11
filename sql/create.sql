DELIMITER //

-- Delete the "CreateMusicDatabase" procedure if it exists
DROP PROCEDURE IF EXISTS CreateMusicDatabase;

-- Create the "music" database
CREATE PROCEDURE CreateMusicDatabase()
BEGIN
    -- Create the "artiste" table
    CREATE TABLE IF NOT EXISTS artiste (
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        nom VARCHAR(255) NOT NULL,
        date_de_naissance DATE,
        nationalite VARCHAR(100)
    );

    -- Create the "categorie" table
    CREATE TABLE IF NOT EXISTS categorie (
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        nom VARCHAR(100) NOT NULL
    );

    -- Create the "album" table
    CREATE TABLE IF NOT EXISTS album (
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        nom VARCHAR(255) NOT NULL,
        id_artiste INT NOT NULL,
        FOREIGN KEY (id_artiste) REFERENCES artiste(id)
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
        FOREIGN KEY (id_album) REFERENCES album(id)
    );
END //

DELIMITER ;