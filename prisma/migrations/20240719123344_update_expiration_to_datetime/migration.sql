-- AlterTable
ALTER TABLE "EmailToken" ALTER COLUMN "expires" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "PasswordResetToken" ALTER COLUMN "expires" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "TwoFactorToken" ALTER COLUMN "expires" SET DATA TYPE TIMESTAMP(3);
