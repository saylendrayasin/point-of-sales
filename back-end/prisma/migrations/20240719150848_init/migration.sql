-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "invoice_no" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "customer_name" TEXT NOT NULL,
    "salesperson_name" TEXT,
    "payment_type" TEXT NOT NULL,
    "notes" TEXT,
    "total_amount" DOUBLE PRECISION NOT NULL DEFAULT 0.0,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "picture" TEXT,
    "stock" INTEGER,
    "price" DOUBLE PRECISION,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceProduct" (
    "id" SERIAL NOT NULL,
    "invoice_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "total_cogs" DOUBLE PRECISION NOT NULL,
    "total_price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "InvoiceProduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InvoiceProduct_invoice_id_product_id_key" ON "InvoiceProduct"("invoice_id", "product_id");

-- AddForeignKey
ALTER TABLE "InvoiceProduct" ADD CONSTRAINT "InvoiceProduct_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceProduct" ADD CONSTRAINT "InvoiceProduct_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
