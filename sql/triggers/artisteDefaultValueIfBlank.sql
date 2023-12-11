CREATE TRIGGER before_insert_artist
BEFORE INSERT ON artiste
FOR EACH ROW
BEGIN

    IF NEW.nom = '' THEN
        
        -- Count the number of rows where nom starts with 'Artiste Inconnu%'
        SELECT COUNT(nom) INTO @count_artist_inconnu FROM artiste WHERE nom LIKE 'Artiste Inconnu%';

        SET NEW.nom = CONCAT('Artiste Inconnu ', @count_artist_inconnu + 1);
    END IF;
END