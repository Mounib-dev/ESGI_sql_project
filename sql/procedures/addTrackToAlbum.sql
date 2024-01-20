CREATE PROCEDURE IF NOT EXISTS AddTrackToAlbum(IN title VARCHAR(255), IN duration INT, IN release_date DATE, IN id_album INT, id_category INT)
BEGIN
    SELECT @artist_id := id_artiste FROM album WHERE id = id_album;

    INSERT INTO morceau (titre, duree, date_sortie, id_artiste, id_categorie, id_album)
    VALUES (title, duration, release_date, @artist_id, id_category, id_album);

END;