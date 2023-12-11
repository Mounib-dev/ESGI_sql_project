CREATE TRIGGER artist_valid_birth_date
BEFORE INSERT ON artiste
FOR EACH ROW
BEGIN
   IF NEW.date_de_naissance IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Date de naissance non valide';
   ELSEIF
      NEW.date_de_naissance > CURRENT_DATE() THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Date de naissance non valide';
    END IF;
END;