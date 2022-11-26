/*
  Warnings:

  - Added the required column `firebase_id` to the `Notifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Notifications` ADD COLUMN `firebase_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `branches` ADD COLUMN `last_notification` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
