/*
  Warnings:

  - You are about to drop the column `deleted_at` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `discount` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `inventory` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `category` DROP COLUMN `deleted_at`;

-- AlterTable
ALTER TABLE `discount` DROP COLUMN `deleted_at`;

-- AlterTable
ALTER TABLE `inventory` DROP COLUMN `deleted_at`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `deleted_at`;
