CREATE TRIGGER before_insert_artist
BEFORE INSERT ON artiste
FOR EACH ROW
BEGIN

    IF NEW.nom = '' THEN
        SET NEW.nom = 'Artiste Inconnu';
    END IF;
END