import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddDescriptionToBookmark1737023940000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'bookmarks',
      new TableColumn({
        name: 'description',
        type: 'varchar',
        length: '1000',
        isNullable: true,
        default: null,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('bookmarks', 'description');
  }
}
