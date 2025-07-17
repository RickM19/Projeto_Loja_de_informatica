import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class CreateOrder1751716222816 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'orders',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'customer_id',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'total_amount',
                        type: 'decimal',
                        precision: 10,
                        scale: 2,
                        isNullable: false,
                    },
                    {
                        name: 'status',
                        type: 'enum',
                        enum: ['PENDENTE', 'FINALIZADO'],
                        default: `'PENDENTE'`,
                        isNullable: false,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            }),
        );
        await queryRunner.createForeignKey(
            'orders',
            new TableForeignKey({
                name: 'ordersCustomer',
                columnNames: ['customer_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'customers',
                onDelete: 'SET NULL',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('orders', 'ordersCustomer');
        await queryRunner.dropTable('orders');
    }
}
