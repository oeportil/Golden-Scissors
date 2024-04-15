/*
  Warnings:

  - A unique constraint covering the columns `[telefono]` on the table `Usuarios` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_telefono_key" ON "Usuarios"("telefono");
