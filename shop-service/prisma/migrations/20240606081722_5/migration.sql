/*
  Warnings:

  - Added the required column `shopId` to the `Shops_Updates` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Shops_Updates` DROP FOREIGN KEY `Shops_Updates_id_fkey`;

-- AlterTable
ALTER TABLE `Shops_Updates` ADD COLUMN `shopId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Shops_Updates` ADD CONSTRAINT `Shops_Updates_shopId_fkey` FOREIGN KEY (`shopId`) REFERENCES `Shops`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
