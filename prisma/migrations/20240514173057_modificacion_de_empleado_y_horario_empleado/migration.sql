/*
  Warnings:

  - You are about to drop the column `id_empleado` on the `horarioEmpleado` table. All the data in the column will be lost.
  - Added the required column `id_horarioEmpleado` to the `Empleados` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "horarioEmpleado" DROP CONSTRAINT "horarioEmpleado_id_empleado_fkey";

-- AlterTable
ALTER TABLE "Empleados" ADD COLUMN     "id_horarioEmpleado" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "horarioEmpleado" DROP COLUMN "id_empleado";

-- AddForeignKey
ALTER TABLE "Empleados" ADD CONSTRAINT "Empleados_id_horarioEmpleado_fkey" FOREIGN KEY ("id_horarioEmpleado") REFERENCES "horarioEmpleado"("id_horarioEmpleado") ON DELETE RESTRICT ON UPDATE CASCADE;
