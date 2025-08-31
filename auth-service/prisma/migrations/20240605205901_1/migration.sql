-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `name` TEXT NOT NULL,
    `password` VARCHAR(30) NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `disabled` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` TEXT NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `disabled` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Route` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `label` TEXT NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `disabled` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Shop_Phone` (
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

-- CreateTable
CREATE TABLE `Shops` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` TEXT NOT NULL,
    `address` TEXT NOT NULL,
    `longitude` TEXT NOT NULL,
    `lattitude` TEXT NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `disabled` BOOLEAN NOT NULL DEFAULT false,
    `email` VARCHAR(255) NOT NULL,
    `ownerId` INTEGER NOT NULL,
    `routeId` INTEGER NOT NULL,
    `shoptypesId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Shops_email_key`(`email`),
    INDEX `Shops_ownerId_fkey`(`ownerId`),
    INDEX `Shops_routeId_fkey`(`routeId`),
    INDEX `Shops_shoptypesId_fkey`(`shoptypesId`),
    INDEX `Shops_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Shoptypes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `label` TEXT NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `disabled` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Shop_Phone` ADD CONSTRAINT `Shop_Phone_id_fkey` FOREIGN KEY (`id`) REFERENCES `Shops`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Shops` ADD CONSTRAINT `Shops_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Shops` ADD CONSTRAINT `Shops_routeId_fkey` FOREIGN KEY (`routeId`) REFERENCES `Route`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Shops` ADD CONSTRAINT `Shops_shoptypesId_fkey` FOREIGN KEY (`shoptypesId`) REFERENCES `Shoptypes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Shops` ADD CONSTRAINT `Shops_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
