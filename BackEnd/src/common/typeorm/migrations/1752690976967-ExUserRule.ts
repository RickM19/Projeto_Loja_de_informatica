import { MigrationInterface, QueryRunner } from "typeorm";

export class ExUserRule1752690976967 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE OR REPLACE RULE ex_user_rule AS 
            ON DELETE TO users
            DO INSERT INTO ex_users (name, email) VALUES 
            (OLD.name, OLD.email);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP RULE exUserRule on ex_user
        `);
    }

}
