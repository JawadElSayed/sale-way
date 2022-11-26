/*
  Warnings:

  - The primary key for the `Notifications` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `Notifications` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`firebase_id`);

-- CreateIndex
CREATE INDEX `Notifications_firebase_id_idx` ON `Notifications`(`firebase_id`);
