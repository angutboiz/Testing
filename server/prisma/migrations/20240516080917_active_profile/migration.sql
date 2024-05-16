/*
  Warnings:

  - Added the required column `city` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Made the column `address` on table `Profile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "province" TEXT NOT NULL,
ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "avatar" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;
