/*
  Warnings:

  - Added the required column `total` to the `order_item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order_item` ADD COLUMN `quantify` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `saved` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `total` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `basic_info` VARCHAR(500) NULL,
    ADD COLUMN `benfits` VARCHAR(500) NULL,
    ADD COLUMN `scientific_evidence` VARCHAR(500) NULL,
    ADD COLUMN `why_unique` VARCHAR(500) NULL;
