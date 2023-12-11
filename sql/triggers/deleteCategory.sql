CREATE TRIGGER before_delete_trigger
BEFORE DELETE ON categorie
FOR EACH ROW
BEGIN
    -- Exemple d'une mise à jour sur table_destination
    UPDATE morceau
    SET id_categorie = NULL
    WHERE id_categorie = OLD.id; -- OLD.champ2 fait référence à la valeur avant la suppression
END;