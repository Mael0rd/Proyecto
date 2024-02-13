/*
  Warnings:

  - You are about to drop the column `trasladoId` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the `_bodegasencargados` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[usuarioId]` on the table `Bodega` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `usuarioId` to the `Bodega` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_bodegasencargados` DROP FOREIGN KEY `_BodegasEncargados_A_fkey`;

-- DropForeignKey
ALTER TABLE `_bodegasencargados` DROP FOREIGN KEY `_BodegasEncargados_B_fkey`;

-- DropIndex
DROP INDEX `Usuario_trasladoId_key` ON `usuario`;

-- AlterTable
ALTER TABLE `bodega` ADD COLUMN `usuarioId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `trasladoId`;

-- DropTable
DROP TABLE `_bodegasencargados`;

-- CreateIndex
CREATE UNIQUE INDEX `Bodega_usuarioId_key` ON `Bodega`(`usuarioId`);

-- AddForeignKey
ALTER TABLE `Bodega` ADD CONSTRAINT `Bodega_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
