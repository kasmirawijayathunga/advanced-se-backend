/*
  Warnings:

  - You are about to drop the `Shop_Phone` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Shop_Phone` DROP FOREIGN KEY `Shop_Phone_id_fkey`;

-- DropTable
DROP TABLE `Shop_Phone`;

-- CreateTable
CREATE TABLE `Shops_Phone` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `phone1` VARCHAR(15) NULL DEFAULT '',
    `phone1_whatsapp` BOOLEAN NULL DEFAULT false,
    `phone1_call` BOOLEAN NULL DEFAULT false,
    `phone1_message` BOOLEAN NULL DEFAULT false,
    `phone2` VARCHAR(15) NULL DEFAULT '',
    `phone2_whatsapp` BOOLEAN NULL DEFAULT false,
    `phone2_call` BOOLEAN NULL DEFAULT false,
    `phone2_message` BOOLEAN NULL DEFAULT false,
    `phone3` VARCHAR(15) NULL DEFAULT '',
    `phone3_whatsapp` BOOLEAN NULL DEFAULT false,
    `phone3_call` BOOLEAN NULL DEFAULT false,
    `phone3_message` BOOLEAN NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Shops_Phone` ADD CONSTRAINT `Shops_Phone_id_fkey` FOREIGN KEY (`id`) REFERENCES `Shops`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
