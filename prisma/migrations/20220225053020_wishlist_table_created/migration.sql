-- CreateTable
CREATE TABLE `Product_review` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `review` VARCHAR(500) NOT NULL,
    `rating` VARCHAR(191) NULL,
    `user_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product_review` ADD CONSTRAINT `Product_review_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product_review` ADD CONSTRAINT `Product_review_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
