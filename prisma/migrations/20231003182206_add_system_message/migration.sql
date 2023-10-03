-- CreateTable
CREATE TABLE "SystemMessage" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "SystemMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SystemMessage_id_key" ON "SystemMessage"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SystemMessage_userId_key" ON "SystemMessage"("userId");

-- AddForeignKey
ALTER TABLE "SystemMessage" ADD CONSTRAINT "SystemMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
