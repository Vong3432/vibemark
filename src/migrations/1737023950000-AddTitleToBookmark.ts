import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddTitleToBookmark1737023950000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'bookmarks',
      new TableColumn({
        name: 'title',
        type: 'varchar',
        length: '255',
        isNullable: false,
        default: "''", // Default empty string for existing rows
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('bookmarks', 'title');
  }
}
