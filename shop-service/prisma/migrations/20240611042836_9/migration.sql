-- CreateTable
CREATE TABLE `Shops_Images` (
    `id` VARCHAR(191) NOT NULL,
    `img1` VARCHAR(60) NULL DEFAULT '',
    `img2` VARCHAR(60) NULL DEFAULT '',
    `img3` VARCHAR(60) NULL DEFAULT '',
    `img4` VARCHAR(60) NULL DEFAULT '',
    `img5` VARCHAR(60) NULL DEFAULT '',

    UNIQUE INDEX `Shops_Images_img1_key`(`img1`),
    UNIQUE INDEX `Shops_Images_img2_key`(`img2`),
    UNIQUE INDEX `Shops_Images_img3_key`(`img3`),
    UNIQUE INDEX `Shops_Images_img4_key`(`img4`),
    UNIQUE INDEX `Shops_Images_img5_key`(`img5`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Shops_Images` ADD CONSTRAINT `Shops_Images_id_fkey` FOREIGN KEY (`id`) REFERENCES `Shops`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
