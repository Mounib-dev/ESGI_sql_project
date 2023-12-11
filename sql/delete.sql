DELIMITER //

DROP PROCEDURE IF EXISTS DeleteCategory;

CREATE PROCEDURE DeleteCategory(IN p_id INT)
BEGIN
    -- Changing all the morceau having the category to NULL
    UPDATE morceau SET id_categorie = NULL WHERE id_categorie = p_id;
    -- Delete the category
    DELETE FROM categorie WHERE id = p_id;
END //

DELIMITER ;

DELIMITER //
DROP PROCEDURE IF EXISTS CleanDatabase;
CREATE PROCEDURE CleanDatabase()
BEGIN
    -- Delete the "morceau" table
    DROP TABLE IF EXISTS morceau;
    -- Delete the "album" table
    DROP TABLE IF EXISTS album;
    -- Delete the "categorie" table
    DROP TABLE IF EXISTS categorie;
    -- Delete the "artiste" table
    DROP TABLE IF EXISTS artiste;
END //
DELIMITER ;
