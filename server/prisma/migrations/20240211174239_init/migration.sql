/*
  Warnings:

  - You are about to drop the `ajustes` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[inventarioId]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[trasladoId]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `trasladoId` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `traslado` ADD COLUMN `fechaEnvio` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `fechaRecibido` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `trasladoId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `ajustes`;

-- CreateTable
CREATE TABLE `Movimientos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipoMovimiento` VARCHAR(191) NOT NULL,
    `fechaMovimiento` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `justificacion` VARCHAR(191) NOT NULL,
    `usuarioId` INTEGER NOT NULL,
    `bodegaId` INTEGER NOT NULL,
    `productoId` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,

    UNIQUE INDEX `Movimientos_usuarioId_key`(`usuarioId`),
    UNIQUE INDEX `Movimientos_bodegaId_key`(`bodegaId`),
    UNIQUE INDEX `Movimientos_productoId_key`(`productoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_Origen` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_Origen_AB_unique`(`A`, `B`),
    INDEX `_Origen_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_Destino` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_Destino_AB_unique`(`A`, `B`),
    INDEX `_Destino_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Usuario_inventarioId_key` ON `Usuario`(`inventarioId`);

-- CreateIndex
CREATE UNIQUE INDEX `Usuario_trasladoId_key` ON `Usuario`(`trasladoId`);

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_trasladoId_fkey` FOREIGN KEY (`trasladoId`) REFERENCES `Traslado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Movimientos` ADD CONSTRAINT `Movimientos_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Movimientos` ADD CONSTRAINT `Movimientos_bodegaId_fkey` FOREIGN KEY (`bodegaId`) REFERENCES `Bodega`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Movimientos` ADD CONSTRAINT `Movimientos_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Origen` ADD CONSTRAINT `_Origen_A_fkey` FOREIGN KEY (`A`) REFERENCES `Bodega`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Origen` ADD CONSTRAINT `_Origen_B_fkey` FOREIGN KEY (`B`) REFERENCES `Traslado`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Destino` ADD CONSTRAINT `_Destino_A_fkey` FOREIGN KEY (`A`) REFERENCES `Bodega`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Destino` ADD CONSTRAINT `_Destino_B_fkey` FOREIGN KEY (`B`) REFERENCES `Traslado`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
