
CREATE PROCEDURE IF NOT EXISTS insert_artiste(IN p_nom VARCHAR(255), IN p_date_de_naissance INT, IN p_nationalite VARCHAR(100))
    BEGIN
        INSERT INTO artiste (nom, date_de_naissance, nationalite) VALUES (p_nom, p_date_de_naissance, p_nationalite);
        INSERT INTO artiste (nom, date_de_naissance, nationalite) VALUES ('Mozart', '1756-01-27', 'Autrichien');
        INSERT INTO artiste (nom, date_de_naissance, nationalite) VALUES ('Beethoven', '1770-12-17', 'Allemand');
        INSERT INTO artiste (nom, date_de_naissance, nationalite) VALUES ('Bach', '1685-03-31', 'Allemand');
        DELETE FROM artiste WHERE nom = p_nom;
    END

