/*
  Warnings:

  - The primary key for the `Customer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Route` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Shops` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Shops_Phone` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Shops_Updates` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Shoptypes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `Shops` DROP FOREIGN KEY `Shops_ownerId_fkey`;

-- DropForeignKey
ALTER TABLE `Shops` DROP FOREIGN KEY `Shops_routeId_fkey`;

-- DropForeignKey
ALTER TABLE `Shops` DROP FOREIGN KEY `Shops_shoptypesId_fkey`;

-- DropForeignKey
ALTER TABLE `Shops` DROP FOREIGN KEY `Shops_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Shops_Phone` DROP FOREIGN KEY `Shops_Phone_id_fkey`;

-- DropForeignKey
ALTER TABLE `Shops_Updates` DROP FOREIGN KEY `Shops_Updates_shopId_fkey`;

-- DropForeignKey
ALTER TABLE `Shops_Updates` DROP FOREIGN KEY `Shops_Updates_userId_fkey`;

-- AlterTable
ALTER TABLE `Customer` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Route` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Shops` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `ownerId` VARCHAR(191) NOT NULL,
    MODIFY `routeId` VARCHAR(191) NOT NULL,
    MODIFY `shoptypesId` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Shops_Phone` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Shops_Updates` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    MODIFY `shopId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Shoptypes` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Shops_Phone` ADD CONSTRAINT `Shops_Phone_id_fkey` FOREIGN KEY (`id`) REFERENCES `Shops`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Shops` ADD CONSTRAINT `Shops_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Shops` ADD CONSTRAINT `Shops_routeId_fkey` FOREIGN KEY (`routeId`) REFERENCES `Route`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Shops` ADD CONSTRAINT `Shops_shoptypesId_fkey` FOREIGN KEY (`shoptypesId`) REFERENCES `Shoptypes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Shops` ADD CONSTRAINT `Shops_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Shops_Updates` ADD CONSTRAINT `Shops_Updates_shopId_fkey` FOREIGN KEY (`shopId`) REFERENCES `Shops`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Shops_Updates` ADD CONSTRAINT `Shops_Updates_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
