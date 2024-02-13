/*
  Warnings:

  - You are about to drop the column `apellido1` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `apellido2` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `inventarioId` on the `usuario` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[usuarioId]` on the table `Inventario` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[usuarioId]` on the table `Orden` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[usuarioId]` on the table `Traslado` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `usuarioId` to the `Inventario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioId` to the `Traslado` table without a default value. This is not possible if the table is not empty.
  - Added the required column `apellidos` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `usuario` DROP FOREIGN KEY `Usuario_inventarioId_fkey`;

-- DropForeignKey
ALTER TABLE `usuario` DROP FOREIGN KEY `Usuario_trasladoId_fkey`;

-- AlterTable
ALTER TABLE `inventario` ADD COLUMN `usuarioId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `traslado` ADD COLUMN `usuarioId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `apellido1`,
    DROP COLUMN `apellido2`,
    DROP COLUMN `inventarioId`,
    ADD COLUMN `apellidos` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Inventario_usuarioId_key` ON `Inventario`(`usuarioId`);

-- CreateIndex
CREATE UNIQUE INDEX `Orden_usuarioId_key` ON `Orden`(`usuarioId`);

-- CreateIndex
CREATE UNIQUE INDEX `Traslado_usuarioId_key` ON `Traslado`(`usuarioId`);

-- AddForeignKey
ALTER TABLE `Inventario` ADD CONSTRAINT `Inventario_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Traslado` ADD CONSTRAINT `Traslado_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
