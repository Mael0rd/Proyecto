/*
  Warnings:

  - You are about to drop the column `usuarioId` on the `inventario` table. All the data in the column will be lost.
  - Added the required column `inventarioId` to the `Bodega` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inventarioId` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `inventario` DROP FOREIGN KEY `Inventario_usuarioId_fkey`;

-- AlterTable
ALTER TABLE `bodega` ADD COLUMN `inventarioId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `inventario` DROP COLUMN `usuarioId`;

-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `inventarioId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_inventarioId_fkey` FOREIGN KEY (`inventarioId`) REFERENCES `Inventario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bodega` ADD CONSTRAINT `Bodega_inventarioId_fkey` FOREIGN KEY (`inventarioId`) REFERENCES `Inventario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
