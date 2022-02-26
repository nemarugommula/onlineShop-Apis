/*
  Warnings:

  - A unique constraint covering the columns `[product_id]` on the table `cart_item` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `session` MODIFY `total` DECIMAL(65, 30) NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `user` MODIFY `picture` VARCHAR(200) NULL DEFAULT '/profile.svg';

-- CreateIndex
CREATE UNIQUE INDEX `cart_item_product_id_key` ON `cart_item`(`product_id`);
