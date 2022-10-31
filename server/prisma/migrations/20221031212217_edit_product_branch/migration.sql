-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `fk_products_branches1`;

-- CreateTable
CREATE TABLE `_branchesToproducts` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_branchesToproducts_AB_unique`(`A`, `B`),
    INDEX `_branchesToproducts_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_branchesToproducts` ADD CONSTRAINT `_branchesToproducts_A_fkey` FOREIGN KEY (`A`) REFERENCES `branches`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_branchesToproducts` ADD CONSTRAINT `_branchesToproducts_B_fkey` FOREIGN KEY (`B`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
