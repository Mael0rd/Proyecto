/*
  Warnings:

  - You are about to drop the column `ordenId` on the `bodega` table. All the data in the column will be lost.
  - You are about to drop the column `proovedorid` on the `orden` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `producto` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `producto` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `producto` table. All the data in the column will be lost.
  - You are about to drop the column `numero` on the `proovedor` table. All the data in the column will be lost.
  - Added the required column `bodegaId` to the `Orden` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proovedorId` to the `Orden` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cantidad` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numeroTelefonico` to the `Proovedor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `bodega` DROP FOREIGN KEY `Bodega_ordenId_fkey`;

-- DropForeignKey
ALTER TABLE `orden` DROP FOREIGN KEY `Orden_proovedorid_fkey`;

-- AlterTable
ALTER TABLE `bodega` DROP COLUMN `ordenId`;

-- AlterTable
ALTER TABLE `orden` DROP COLUMN `proovedorid`,
    ADD COLUMN `bodegaId` INTEGER NOT NULL,
    ADD COLUMN `proovedorId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `producto` DROP COLUMN `createdAt`,
    DROP COLUMN `estado`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `cantidad` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `proovedor` DROP COLUMN `numero`,
    ADD COLUMN `numeroTelefonico` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Ajustes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cantidad` INTEGER NOT NULL,
    `tipoMovimiento` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Traslado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cantidad` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Orden` ADD CONSTRAINT `Orden_proovedorId_fkey` FOREIGN KEY (`proovedorId`) REFERENCES `Proovedor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orden` ADD CONSTRAINT `Orden_bodegaId_fkey` FOREIGN KEY (`bodegaId`) REFERENCES `Bodega`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
