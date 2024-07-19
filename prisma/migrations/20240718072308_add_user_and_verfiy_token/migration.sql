/*
  Warnings:

  - You are about to drop the `ToGo` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT,
ADD COLUMN     "twoFactorEnabled" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "ToGo";

-- CreateTable
CREATE TABLE "EmailToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" DATE NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "EmailToken_pkey" PRIMARY KEY ("id")
);
