-- CreateTable
CREATE TABLE "LoginFailedAttempt" (
"id" SERIAL,
    "email" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResetPasswordFailedAttempt" (
"id" SERIAL,
    "email" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LoginFailedAttempt.email_unique" ON "LoginFailedAttempt"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ResetPasswordFailedAttempt.email_unique" ON "ResetPasswordFailedAttempt"("email");

-- AddForeignKey
ALTER TABLE "LoginFailedAttempt" ADD FOREIGN KEY("email")REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResetPasswordFailedAttempt" ADD FOREIGN KEY("email")REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;
