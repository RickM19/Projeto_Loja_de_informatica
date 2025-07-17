import { ViewEntity, ViewColumn, PrimaryColumn } from "typeorm";

@ViewEntity({ name: "order_summary_with_products" })
export class OrderSummaryWithProductsView {
  @ViewColumn()
  @PrimaryColumn()
  order_id: string;

  @ViewColumn()
  customer_name: string;

  @ViewColumn()
  customer_phone: string;

  @ViewColumn()
  customer_cpf: string;

  @ViewColumn()
  customer_address: string;

  @ViewColumn()
  total_amount: string;

  @ViewColumn()
  products: {
    name: string;
    code: string;
    price: number;
    quantity: number;
    subTotal: number;
  }[];
}
