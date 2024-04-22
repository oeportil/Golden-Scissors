/*
  Warnings:

  - Added the required column `salario` to the `Empleados` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE OR REPLACE FUNCTION buscar_usuario(email_input TEXT, password_input TEXT)
RETURNS record AS $$
DECLARE
    usuario record;
BEGIN
    -- Busca el usuario por correo y contraseña
    SELECT *
    INTO usuario
    FROM Usuarios
    WHERE email = email_input AND password = password_input;

    -- Si se encuentra un usuario, lo devuelve
    IF usuario IS NOT NULL THEN
        RETURN usuario;
    ELSE
        -- Si no se encuentra ningún usuario, devuelve NULL
        RETURN NULL;
    END IF;
END;
$$ LANGUAGE plpgsql;

