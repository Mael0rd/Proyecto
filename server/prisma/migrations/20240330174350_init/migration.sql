/*
  Warnings:

  - Added the required column `canton` to the `Proovedor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `distrito` to the `Proovedor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provincia` to the `Proovedor` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Proovedor_correo_key` ON `proovedor`;

-- AlterTable
ALTER TABLE `proovedor` ADD COLUMN `canton` VARCHAR(191) NOT NULL,
    ADD COLUMN `distrito` VARCHAR(191) NOT NULL,
    ADD COLUMN `provincia` VARCHAR(191) NOT NULL;
