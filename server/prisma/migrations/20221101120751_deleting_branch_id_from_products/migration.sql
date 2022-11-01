/*
  Warnings:

  - You are about to drop the column `branch_id` on the `products` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `fk_products_branches1_idx` ON `products`;

-- AlterTable
ALTER TABLE `products` DROP COLUMN `branch_id`;
