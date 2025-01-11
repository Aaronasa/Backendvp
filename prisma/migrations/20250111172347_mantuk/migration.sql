-- DropForeignKey
ALTER TABLE "Food" DROP CONSTRAINT "Food_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Food" DROP CONSTRAINT "Food_cityId_fkey";

-- AddForeignKey
ALTER TABLE "Food" ADD CONSTRAINT "Food_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Food" ADD CONSTRAINT "Food_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;
