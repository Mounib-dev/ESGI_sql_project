CREATE PROCEDURE IF NOT EXISTS CleanDB()
BEGIN
    -- Delete the "morceau" table
    DROP TABLE IF EXISTS morceau;
    -- Delete the "album" table
    DROP TABLE IF EXISTS album;
    -- Delete the "categorie" table
    DROP TABLE IF EXISTS categorie;
    -- Delete the "artiste" table
    DROP TABLE IF EXISTS artiste;
END;