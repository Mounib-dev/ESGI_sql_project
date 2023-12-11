CREATE TRIGGER before_update_artiste
BEFORE UPDATE ON artiste
FOR EACH ROW
BEGIN
    IF OLD.nationalite != NEW.nationalite THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'La nationalité d''un artiste ne peut pas être modifiée.';
    END IF;
END;