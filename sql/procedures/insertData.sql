CREATE PROCEDURE IF NOT EXISTS InsertData()
BEGIN
    -- insert artistes
    INSERT INTO artiste (nom, date_de_naissance, nationalite) VALUES ('Mozart', '1756-01-27', 'Autrichien');
    INSERT INTO artiste (nom, date_de_naissance, nationalite) VALUES ('Beethoven', '1770-12-17', 'Allemand');
    INSERT INTO artiste (nom, date_de_naissance, nationalite) VALUES ('Bach', '1685-03-31', 'Allemand');

    -- insert albums
    INSERT INTO album (nom, id_artiste) VALUES ('Symphonie n°40', 1);

    INSERT INTO categorie (nom) VALUES ('Classique');
    INSERT INTO categorie (nom) VALUES ('Jazz');
    INSERT INTO categorie (nom) VALUES ('Rock');
    INSERT INTO categorie (nom) VALUES ('Pop');
    INSERT INTO categorie (nom) VALUES ('Rap');
    INSERT INTO categorie (nom) VALUES ('Metal');
    INSERT INTO categorie (nom) VALUES ('Reggae');

    -- insert morceaux
    INSERT INTO morceau (titre, duree, date_sortie, id_artiste, id_album) VALUES ('Symphonie n°40', 25, '1788-07-25', 1, 1);
    INSERT INTO morceau (titre, duree, date_sortie, id_artiste) VALUES ('Symphonie n°41', 25, '1788-07-25', 1);
    INSERT INTO morceau (titre, duree, date_sortie, id_artiste, id_categorie) VALUES ('Symphonie n°39', 25, '1788-07-25', 1, 1);

END;