CREATE IF NOT EXISTS AddTrackToAlbum(IN title VARCHAR(255), IN duration INT, IN release_date DATE, IN id_album INT, id_category INT)
BEGIN

    SELECT id_artiste int @id_artiste from album where id = id_album;

    INSERT INTO morceau (titre, duree, date_sortie, id_artiste, id_categorie, id_album) 
    VALUES (title, duration, release_date, @id_artiste , id_album, @id_artiste);

END;