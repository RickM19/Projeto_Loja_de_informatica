import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProduct1752242895040 implements MigrationInterface {
    name = 'CreateProduct1752242895040'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "imgUrl" text NOT NULL, "code" text NOT NULL, "name" text NOT NULL, "description" text NOT NULL, "value" numeric NOT NULL, "stock" integer NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
