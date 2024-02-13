/*
  Warnings:

  - You are about to drop the column `createdAt` on the `bodega` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `bodega` table. All the data in the column will be lost.
  - You are about to drop the `_bodegatoproducto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_destino` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_origen` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[productoId]` on the table `Bodega` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productoId` to the `Bodega` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bodegaDestinoId` to the `Traslado` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bodegaOrigenId` to the `Traslado` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_bodegatoproducto` DROP FOREIGN KEY `_BodegaToProducto_A_fkey`;

-- DropForeignKey
ALTER TABLE `_bodegatoproducto` DROP FOREIGN KEY `_BodegaToProducto_B_fkey`;

-- DropForeignKey
ALTER TABLE `_destino` DROP FOREIGN KEY `_Destino_A_fkey`;

-- DropForeignKey
ALTER TABLE `_destino` DROP FOREIGN KEY `_Destino_B_fkey`;

-- DropForeignKey
ALTER TABLE `_origen` DROP FOREIGN KEY `_Origen_A_fkey`;

-- DropForeignKey
ALTER TABLE `_origen` DROP FOREIGN KEY `_Origen_B_fkey`;

-- AlterTable
ALTER TABLE `bodega` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `productoId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `traslado` ADD COLUMN `bodegaDestinoId` INTEGER NOT NULL,
    ADD COLUMN `bodegaOrigenId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_bodegatoproducto`;

-- DropTable
DROP TABLE `_destino`;

-- DropTable
DROP TABLE `_origen`;

-- CreateTable
CREATE TABLE `_BodegasEncargados` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_BodegasEncargados_AB_unique`(`A`, `B`),
    INDEX `_BodegasEncargados_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Bodega_productoId_key` ON `Bodega`(`productoId`);

-- AddForeignKey
ALTER TABLE `Bodega` ADD CONSTRAINT `Bodega_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Traslado` ADD CONSTRAINT `Traslado_bodegaDestinoId_fkey` FOREIGN KEY (`bodegaDestinoId`) REFERENCES `Bodega`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Traslado` ADD CONSTRAINT `Traslado_bodegaOrigenId_fkey` FOREIGN KEY (`bodegaOrigenId`) REFERENCES `Bodega`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BodegasEncargados` ADD CONSTRAINT `_BodegasEncargados_A_fkey` FOREIGN KEY (`A`) REFERENCES `Bodega`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BodegasEncargados` ADD CONSTRAINT `_BodegasEncargados_B_fkey` FOREIGN KEY (`B`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
