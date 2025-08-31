-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_id_fkey`;

-- AlterTable
ALTER TABLE `User` MODIFY `role` INTEGER NOT NULL DEFAULT 2;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_role_fkey` FOREIGN KEY (`role`) REFERENCES `User_Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
