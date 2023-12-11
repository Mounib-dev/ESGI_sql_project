CREATE PROCEDURE DeleteCategory(IN p_id INT)
BEGIN
    UPDATE morceau SET id_categorie = NULL WHERE id_categorie = p_id;
    DELETE FROM categorie WHERE id = p_id;
END;