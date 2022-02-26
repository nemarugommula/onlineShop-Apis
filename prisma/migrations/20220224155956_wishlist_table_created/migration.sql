/*
  Warnings:

  - You are about to drop the column `endpoint` on the `Campaign` table. All the data in the column will be lost.
  - Added the required column `table_name` to the `Campaign` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Campaign` DROP COLUMN `endpoint`,
    ADD COLUMN `table_name` VARCHAR(200) NOT NULL;
