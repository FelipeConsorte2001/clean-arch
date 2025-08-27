/*
  Warnings:

  - You are about to drop the `test.users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "test"."test.users";

-- CreateTable
CREATE TABLE "test"."users" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "test"."users"("email");
