import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createLocal1637690578706 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'create_local',
            columns:[
              {
                  name: 'id',
                  type: 'integer',
                  unsigned: true,
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment',
              },
              {
                  name: "name",
                  type: 'varchar',
              },
              {
                  name: 'latitude',
                  type: 'varchar',
                  
              },
              {
                name: 'longitude',
                type: 'varchar',
                
            },
            {
                name: 'about',
                type: 'text',
            },
            {
                name: 'instructions',
                type: 'text',
            },
            {
                name: 'phone',
                type: 'text'
            },
            {
              name: "horario_funcionamento",
              type: 'varchar',
          },
            ],
          }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('create_local');
    }

}
