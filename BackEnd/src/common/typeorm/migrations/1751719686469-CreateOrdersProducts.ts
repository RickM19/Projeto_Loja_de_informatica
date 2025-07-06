import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class CreateOrdersProducts1751719686469 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'orders_product',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'order_id',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'product_id',
                        type: 'uuid',
                        isNullable: null,
                    },
                    {
                        name: 'price',
                        type: 'decimal',
                        precision: 10,
                        scale: 2,
                        isNullable: false,
                    },
                    {
                        name: 'quantity',
                        type: 'int',
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
            'orders_product',
            new TableForeignKey({
                name: 'ordersProductOrder',
                columnNames: ['order_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'orders',
                onDelete: 'CASCADE',
            }),
        );
        await queryRunner.createForeignKey(
            'orders_product',
            new TableForeignKey({
                name: 'ordersProductProduct',
                columnNames: ['product_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'products',
                onDelete: 'SET NULL',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(
            'orders_product',
            'ordersProductOrder',
        );
        await queryRunner.dropForeignKey(
            'orders_product',
            'ordersProductProduct',
        );
        await queryRunner.dropTable('orders_product');
    }
}
