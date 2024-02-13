/*
  Warnings:

  - You are about to drop the column `usuarioActualiza` on the `inventario` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioRegistra` on the `inventario` table. All the data in the column will be lost.
  - You are about to drop the `_categoriatoproducto` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[ordenId]` on the table `Bodega` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[subCategoriaId]` on the table `Categoria` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `subCategoriaId` to the `Categoria` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_categoriatoproducto` DROP FOREIGN KEY `_CategoriaToProducto_A_fkey`;

-- DropForeignKey
ALTER TABLE `_categoriatoproducto` DROP FOREIGN KEY `_CategoriaToProducto_B_fkey`;

-- AlterTable
ALTER TABLE `categoria` ADD COLUMN `subCategoriaId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `inventario` DROP COLUMN `usuarioActualiza`,
    DROP COLUMN `usuarioRegistra`,
    ADD COLUMN `usuarioId` INTEGER NULL;

-- DropTable
DROP TABLE `_categoriatoproducto`;

-- CreateTable
CREATE TABLE `SubCategoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(191) NOT NULL,
    `productoId` INTEGER NOT NULL,

    UNIQUE INDEX `SubCategoria_productoId_key`(`productoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Bodega_ordenId_key` ON `Bodega`(`ordenId`);

-- CreateIndex
CREATE UNIQUE INDEX `Categoria_subCategoriaId_key` ON `Categoria`(`subCategoriaId`);

-- AddForeignKey
ALTER TABLE `SubCategoria` ADD CONSTRAINT `SubCategoria_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Categoria` ADD CONSTRAINT `Categoria_subCategoriaId_fkey` FOREIGN KEY (`subCategoriaId`) REFERENCES `SubCategoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inventario` ADD CONSTRAINT `Inventario_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
