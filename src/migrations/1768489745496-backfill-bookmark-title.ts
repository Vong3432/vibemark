import { MigrationInterface, QueryRunner } from 'typeorm';

export class BackfillBookmarkTitle1768489745496 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    UPDATE bookmarks
    SET title = 'Unknown'
    WHERE title = NULL OR title = ''
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
