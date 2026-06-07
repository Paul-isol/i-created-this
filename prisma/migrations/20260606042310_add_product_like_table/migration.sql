-- CreateTable
CREATE TABLE "product_like" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "product_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_like_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "product_like_product_idx" ON "product_like"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "product_like_user_product_idx" ON "product_like"("user_id", "product_id");
