/*
  Warnings:

  - You are about to alter the column `addressType` on the `addresses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `addresses` MODIFY `addressType` ENUM('Home', 'Mailing', 'Same') NOT NULL DEFAULT 'Same';
