/*
  Warnings:

  - You are about to alter the column `image` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(512)` to `VarChar(255)`.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MENTOR', 'LEARNER');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "MentorshipStatus" AS ENUM ('YES', 'NO');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" DEFAULT 'LEARNER',
ADD COLUMN     "status" "Status" DEFAULT 'PENDING',
ALTER COLUMN "image" SET DATA TYPE VARCHAR(255);

-- CreateTable
CREATE TABLE "Mentor" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" VARCHAR(100),
    "email" VARCHAR(100),
    "phonenumber" VARCHAR(20),
    "bio" TEXT,
    "country" VARCHAR(50),
    "schoolName" VARCHAR(100),
    "graduationYear" INTEGER,
    "company" VARCHAR(100),
    "guidefor" VARCHAR(255),
    "profileUrl" TEXT,
    "idcardUrl" TEXT,
    "readyForMentorship" "MentorshipStatus",
    "skills" VARCHAR(300),
    "linkedInUrl" VARCHAR(255),
    "xUrl" VARCHAR(255),
    "rating" DOUBLE PRECISION DEFAULT 0.0,
    "reviewCount" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Mentor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Learner" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phonenumber" VARCHAR(20),
    "country" VARCHAR(50),
    "educationLevel" VARCHAR(50),
    "schoolName" VARCHAR(50),
    "schoolCardUrl" TEXT,
    "profileUrl" TEXT,
    "mentorshipType" VARCHAR(50),
    "bio" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Learner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Mentor_email_key" ON "Mentor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Mentor_phonenumber_key" ON "Mentor"("phonenumber");

-- CreateIndex
CREATE INDEX "Mentor_email_idx" ON "Mentor"("email");

-- CreateIndex
CREATE INDEX "Mentor_userId_idx" ON "Mentor"("userId");

-- CreateIndex
CREATE INDEX "Mentor_schoolName_idx" ON "Mentor"("schoolName");

-- CreateIndex
CREATE INDEX "Mentor_guidefor_idx" ON "Mentor"("guidefor");

-- CreateIndex
CREATE INDEX "Mentor_company_idx" ON "Mentor"("company");

-- CreateIndex
CREATE UNIQUE INDEX "Learner_id_key" ON "Learner"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Learner_email_key" ON "Learner"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Learner_phonenumber_key" ON "Learner"("phonenumber");

-- CreateIndex
CREATE INDEX "Learner_email_idx" ON "Learner"("email");

-- CreateIndex
CREATE INDEX "Learner_userId_idx" ON "Learner"("userId");

-- CreateIndex
CREATE INDEX "Learner_mentorshipType_idx" ON "Learner"("mentorshipType");

-- AddForeignKey
ALTER TABLE "Mentor" ADD CONSTRAINT "Mentor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Learner" ADD CONSTRAINT "Learner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
