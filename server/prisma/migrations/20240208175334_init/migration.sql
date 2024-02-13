/*
  Warnings:

  - You are about to drop the `ordenonproducto` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[ubicacionId]` on the table `Bodega` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[proovedorid]` on the table `Orden` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cantidad` to the `Orden` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productoId` to the `Orden` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proovedorid` to the `Orden` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ordenonproducto` DROP FOREIGN KEY `OrdenOnProducto_ordenId_fkey`;

-- DropForeignKey
ALTER TABLE `ordenonproducto` DROP FOREIGN KEY `OrdenOnProducto_productoId_fkey`;

-- AlterTable
ALTER TABLE `orden` ADD COLUMN `cantidad` INTEGER NOT NULL,
    ADD COLUMN `productoId` INTEGER NOT NULL,
    ADD COLUMN `proovedorid` INTEGER NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- DropTable
DROP TABLE `ordenonproducto`;

-- CreateTable
CREATE TABLE `Proovedor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `correo` VARCHAR(191) NOT NULL,
    `numero` VARCHAR(191) NOT NULL,
    `ubicacionId` INTEGER NULL,
    `direccionExacta` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Proovedor_correo_key`(`correo`),
    UNIQUE INDEX `Proovedor_ubicacionId_key`(`ubicacionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Bodega_ubicacionId_key` ON `Bodega`(`ubicacionId`);

-- CreateIndex
CREATE UNIQUE INDEX `Orden_proovedorid_key` ON `Orden`(`proovedorid`);

-- AddForeignKey
ALTER TABLE `Orden` ADD CONSTRAINT `Orden_proovedorid_fkey` FOREIGN KEY (`proovedorid`) REFERENCES `Proovedor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orden` ADD CONSTRAINT `Orden_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Proovedor` ADD CONSTRAINT `Proovedor_ubicacionId_fkey` FOREIGN KEY (`ubicacionId`) REFERENCES `Ubicacion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
