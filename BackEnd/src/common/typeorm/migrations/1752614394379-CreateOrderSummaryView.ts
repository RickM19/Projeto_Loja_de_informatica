import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrderSummaryView1752614394379 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE VIEW order_summary_with_products AS
            SELECT
                o.id AS order_id,
                c.name AS customer_name,
                c.phone AS customer_phone,
                c.cpf As customer_cpf,
                c.address As customer_address,
                o.total_amount,
                json_agg(
                    json_build_object(
                        'name', p.name,
                        'code', p.code,
                        'value', p.value,
                        'quantity', op.quantity,
                        'subtotal', p.value * op.quantity
                    )
                ) AS products
            FROM orders o
            JOIN customers c ON c.id = o.customer_id
            JOIN orders_product op ON op.order_id = o.id
            JOIN products p ON p.id = op.product_id
            GROUP BY o.id, c.name, c.phone, c.cpf, c.address, o.total_amount;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP VIEW IF EXISTS order_summary_with_products;`);
    }
}
