/*
  Warnings:

  - You are about to drop the column `createdat` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `updatedat` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `createdat` on the `Rental` table. All the data in the column will be lost.
  - You are about to drop the column `updatedat` on the `Rental` table. All the data in the column will be lost.
  - You are about to drop the column `createdat` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `updatedat` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `SustainabilityImpact` table. All the data in the column will be lost.
  - You are about to drop the column `createdat` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedat` on the `User` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Rental` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "createdat",
DROP COLUMN "updatedat",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Rental" DROP COLUMN "createdat",
DROP COLUMN "updatedat",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "createdat",
DROP COLUMN "updatedat",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "SustainabilityImpact" DROP COLUMN "createdAt",
ADD COLUMN     "created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdat",
DROP COLUMN "updatedat",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
