/*
  Warnings:

  - Made the column `name` on table `Images` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Images` MODIFY `name` VARCHAR(200) NOT NULL;
