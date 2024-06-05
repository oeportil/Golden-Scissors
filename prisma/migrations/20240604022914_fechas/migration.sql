/*
  Warnings:

  - You are about to drop the column `fecha` on the `detalleCita` table. All the data in the column will be lost.
  - Added the required column `fecha_fin` to the `detalleCita` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fecha_inicio` to the `detalleCita` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "detalleCita" DROP COLUMN "fecha",
ADD COLUMN     "fecha_fin" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "fecha_inicio" TIMESTAMP(3) NOT NULL;
