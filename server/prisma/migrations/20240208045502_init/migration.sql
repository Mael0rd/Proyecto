/*
  Warnings:

  - You are about to drop the `_roltousuario` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[usuarioId]` on the table `Rol` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `usuarioId` to the `Rol` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_roltousuario` DROP FOREIGN KEY `_RolToUsuario_A_fkey`;

-- DropForeignKey
ALTER TABLE `_roltousuario` DROP FOREIGN KEY `_RolToUsuario_B_fkey`;

-- AlterTable
ALTER TABLE `rol` ADD COLUMN `usuarioId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_roltousuario`;

-- CreateIndex
CREATE UNIQUE INDEX `Rol_usuarioId_key` ON `Rol`(`usuarioId`);

-- AddForeignKey
ALTER TABLE `Rol` ADD CONSTRAINT `Rol_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
