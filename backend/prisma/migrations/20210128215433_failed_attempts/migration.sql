-- CreateTable
CREATE TABLE "LoginFailedAttempt" (
"id" SERIAL,
    "email" TEXT NOT NULL,
    "resolved" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);
