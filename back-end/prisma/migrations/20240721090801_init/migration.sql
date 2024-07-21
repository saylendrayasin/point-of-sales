/*
  Warnings:

  - You are about to drop the `InvoiceProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "InvoiceProduct" DROP CONSTRAINT "InvoiceProduct_invoice_id_fkey";

-- DropForeignKey
ALTER TABLE "InvoiceProduct" DROP CONSTRAINT "InvoiceProduct_product_id_fkey";

-- DropTable
DROP TABLE "InvoiceProduct";

-- DropTable
DROP TABLE "Product";
