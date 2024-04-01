/*
  Warnings:

  - The primary key for the `Usuarios` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Usuarios` table. All the data in the column will be lost.
  - Added the required column `admin` to the `Usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaNac` to the `Usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genero` to the `Usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefono` to the `Usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Usuarios" DROP CONSTRAINT "Usuarios_pkey",
DROP COLUMN "id",
ADD COLUMN     "admin" BOOLEAN NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "fechaNac" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "genero" BOOLEAN NOT NULL,
ADD COLUMN     "id_usuario" SERIAL NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "telefono" TEXT NOT NULL,
ADD CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("id_usuario");

-- CreateTable
CREATE TABLE "Blog" (
    "id_blog" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "fechaCrea" TIMESTAMP(3) NOT NULL,
    "fechaMod" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id_blog")
);

-- CreateTable
CREATE TABLE "Empleados" (
    "id_empleado" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "genero" BOOLEAN NOT NULL,
    "fechaNac" TIMESTAMP(3) NOT NULL,
    "direccion" TEXT NOT NULL,
    "estado" INTEGER NOT NULL,
    "contratado" BOOLEAN NOT NULL,

    CONSTRAINT "Empleados_pkey" PRIMARY KEY ("id_empleado")
);

-- CreateTable
CREATE TABLE "Servicios" (
    "id_servicio" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "duracion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Servicios_pkey" PRIMARY KEY ("id_servicio")
);

-- CreateTable
CREATE TABLE "Categorias" (
    "id_categoria" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Categorias_pkey" PRIMARY KEY ("id_categoria")
);

-- CreateTable
CREATE TABLE "cateCapacitadas" (
    "id_categorias" SERIAL NOT NULL,
    "id_empleado" INTEGER NOT NULL,
    "id_categ" INTEGER NOT NULL,

    CONSTRAINT "cateCapacitadas_pkey" PRIMARY KEY ("id_categorias")
);

-- CreateTable
CREATE TABLE "Citas" (
    "id_cita" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "hora" TIMESTAMP(3) NOT NULL,
    "id_usuario" INTEGER NOT NULL,

    CONSTRAINT "Citas_pkey" PRIMARY KEY ("id_cita")
);

-- CreateTable
CREATE TABLE "detalleCita" (
    "id_detalleCita" SERIAL NOT NULL,
    "id_cita" INTEGER NOT NULL,
    "id_servicio" INTEGER NOT NULL,
    "id_empleado" INTEGER NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "detalleCita_pkey" PRIMARY KEY ("id_detalleCita")
);

-- CreateIndex
CREATE UNIQUE INDEX "Empleados_email_key" ON "Empleados"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Empleados_telefono_key" ON "Empleados"("telefono");

-- AddForeignKey
ALTER TABLE "cateCapacitadas" ADD CONSTRAINT "cateCapacitadas_id_empleado_fkey" FOREIGN KEY ("id_empleado") REFERENCES "Empleados"("id_empleado") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cateCapacitadas" ADD CONSTRAINT "cateCapacitadas_id_categ_fkey" FOREIGN KEY ("id_categ") REFERENCES "Categorias"("id_categoria") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Citas" ADD CONSTRAINT "Citas_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuarios"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalleCita" ADD CONSTRAINT "detalleCita_id_cita_fkey" FOREIGN KEY ("id_cita") REFERENCES "Citas"("id_cita") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalleCita" ADD CONSTRAINT "detalleCita_id_servicio_fkey" FOREIGN KEY ("id_servicio") REFERENCES "Servicios"("id_servicio") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalleCita" ADD CONSTRAINT "detalleCita_id_empleado_fkey" FOREIGN KEY ("id_empleado") REFERENCES "Empleados"("id_empleado") ON DELETE RESTRICT ON UPDATE CASCADE;
