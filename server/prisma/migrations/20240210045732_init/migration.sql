/*
  Warnings:

  - You are about to drop the `_bodegatoinventario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_inventariotoproducto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_bodegatoinventario` DROP FOREIGN KEY `_BodegaToInventario_A_fkey`;

-- DropForeignKey
ALTER TABLE `_bodegatoinventario` DROP FOREIGN KEY `_BodegaToInventario_B_fkey`;

-- DropForeignKey
ALTER TABLE `_inventariotoproducto` DROP FOREIGN KEY `_InventarioToProducto_A_fkey`;

-- DropForeignKey
ALTER TABLE `_inventariotoproducto` DROP FOREIGN KEY `_InventarioToProducto_B_fkey`;

-- AlterTable
ALTER TABLE `producto` ADD COLUMN `inventarioId` INTEGER NULL;

-- DropTable
DROP TABLE `_bodegatoinventario`;

-- DropTable
DROP TABLE `_inventariotoproducto`;

-- CreateTable
CREATE TABLE `_BodegaToProducto` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_BodegaToProducto_AB_unique`(`A`, `B`),
    INDEX `_BodegaToProducto_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_inventarioId_fkey` FOREIGN KEY (`inventarioId`) REFERENCES `Inventario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BodegaToProducto` ADD CONSTRAINT `_BodegaToProducto_A_fkey` FOREIGN KEY (`A`) REFERENCES `Bodega`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BodegaToProducto` ADD CONSTRAINT `_BodegaToProducto_B_fkey` FOREIGN KEY (`B`) REFERENCES `Producto`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
