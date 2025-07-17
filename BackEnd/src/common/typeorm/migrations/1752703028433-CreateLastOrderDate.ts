import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLastOrderDate1752703028433 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE FUNCTION last_order_date()
            RETURNS timestamp
            AS 'SELECT created_at FROM orders WHERE created_at = (SELECT MAX(created_at) FROM orders);'
            LANGUAGE 'sql';
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP FUNCTION IF EXISTS last_order_date;
            `);
    }

}
