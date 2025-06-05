/*
  Warnings:

  - You are about to drop the column `verification_code` on the `VerificationCode` table. All the data in the column will be lost.
  - Added the required column `code` to the `VerificationCode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VerificationCode" DROP COLUMN "verification_code",
ADD COLUMN     "code" VARCHAR(6) NOT NULL;
