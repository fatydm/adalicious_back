-- AddForeignKey
ALTER TABLE "quantities" ADD CONSTRAINT "quantities_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
