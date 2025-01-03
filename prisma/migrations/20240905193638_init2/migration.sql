/*
  Warnings:

  - Added the required column `isSameAddress` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `addresses` ADD COLUMN `isSameAddress` BOOLEAN NOT NULL;
