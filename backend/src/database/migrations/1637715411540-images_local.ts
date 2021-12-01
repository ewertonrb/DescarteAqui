import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class imagesLocal1637715411540 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'images',
            
            columns:[
                {
                name: 'id',
                type: 'integer',
                unsigned: true,
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment'
                },
                {
                name: 'path',
                type: 'varchar',
                },
                {
                name: 'local_id',
                type: 'integer',
                }
            ],
            foreignKeys: [
                {
                name: 'ImageLocal',
                columnNames: ['local_id'],
                referencedTableName: 'create_local',
                referencedColumnNames: ['id'],
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                }
            ]
        }))
    }
    

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('Images');
    }

}
