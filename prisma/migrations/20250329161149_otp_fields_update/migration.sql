-- AlterTable
ALTER TABLE "users" ALTER COLUMN "expiryDate" DROP NOT NULL,
ALTER COLUMN "expiryDate" DROP DEFAULT,
ALTER COLUMN "otpCode" DROP NOT NULL;
