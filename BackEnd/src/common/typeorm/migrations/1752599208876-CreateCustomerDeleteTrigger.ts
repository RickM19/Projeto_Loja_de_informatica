import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCustomerDeleteTrigger1752599208876
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION log_deleted_customer() RETURNS trigger AS $$
            BEGIN
                INSERT INTO old_customers (id, name, cpf, phone, address, deleted_at)
                VALUES (OLD.id, OLD.name, OLD.cpf, OLD.phone, OLD.address, now());
                RETURN OLD;
            END;
            $$ LANGUAGE plpgsql;
        `);

        await queryRunner.query(`
            CREATE TRIGGER trigger_log_deleted_customer
            AFTER DELETE ON customers
            FOR EACH ROW
            EXECUTE FUNCTION log_deleted_customer();
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP TRIGGER IF EXISTS trigger_log_deleted_customer ON customers`,
        );
        await queryRunner.query(`DROP FUNCTION IF EXISTS log_deleted_customer`);
    }
}
