/*
  Warnings:

  - Added the required column `id_categoria` to the `Servicios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Servicios" ADD COLUMN     "id_categoria" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Servicios" ADD CONSTRAINT "Servicios_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "Categorias"("id_categoria") ON DELETE RESTRICT ON UPDATE CASCADE;
