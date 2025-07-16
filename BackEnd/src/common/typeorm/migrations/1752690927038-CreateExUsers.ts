import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateExUsers1752690927038 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(new Table({
                name: 'ex_users',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'name',
                        type: 'text',
                        isNullable: false
                    },
                    {
                        name: 'email',
                        type: 'text',
                        isNullable: false
                    },
                    {
                        name: 'deleted_at',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                ]}))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE ex_users');
    }

}
