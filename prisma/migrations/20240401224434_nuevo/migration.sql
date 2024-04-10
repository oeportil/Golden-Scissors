/*
  Warnings:

  - Added the required column `salario` to the `Empleados` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Empleados" ADD COLUMN     "salario" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "horarioEmpleado" (
    "id_horarioEmpleado" SERIAL NOT NULL,
    "id_empleado" INTEGER NOT NULL,
    "hora_inicio" TIMESTAMP(3) NOT NULL,
    "hora_fin" TIMESTAMP(3) NOT NULL,
    "laboral" BOOLEAN NOT NULL,
    "sabatino" BOOLEAN NOT NULL,
    "dominguero" BOOLEAN NOT NULL,
    "empleadosId_empleado" INTEGER NOT NULL,

    CONSTRAINT "horarioEmpleado_pkey" PRIMARY KEY ("id_horarioEmpleado")
);

-- AddForeignKey
ALTER TABLE "horarioEmpleado" ADD CONSTRAINT "horarioEmpleado_id_empleado_fkey" FOREIGN KEY ("id_empleado") REFERENCES "Empleados"("id_empleado") ON DELETE RESTRICT ON UPDATE CASCADE;
