/*
  Warnings:

  - You are about to drop the column `fechaNac` on the `Empleados` table. All the data in the column will be lost.
  - Added the required column `fechaContra` to the `Empleados` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Empleados" DROP COLUMN "fechaNac",
ADD COLUMN     "fechaContra" TIMESTAMP(3) NOT NULL;
