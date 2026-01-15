import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('bookmarks')
export class Bookmark {
  @ApiProperty({
    description: 'Unique identifier for the bookmark',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'URL of the bookmark from social platforms',
    example: 'https://www.instagram.com/p/example123/',
    maxLength: 2048,
  })
  @Column({ type: 'varchar', length: 2048 })
  url: string;

  @ApiProperty({
    description: 'ID of the user who owns this bookmark',
    example: 'user123',
    maxLength: 255,
  })
  @Column({ name: 'user_id', type: 'varchar', length: 255 })
  userId: string;

  @ApiProperty({
    description: 'Optional description or notes about the bookmark',
    example: 'Saved for later reading about TypeScript best practices',
    required: false,
    nullable: true,
    maxLength: 1000,
  })
  @Column({ type: 'varchar', length: 1000, nullable: true })
  description: string | null;

  @ApiProperty({
    description: 'Title about the bookmark',
    example: 'Foodie',
    required: true,
    nullable: false,
    maxLength: 255,
  })
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ApiProperty({
    description: 'Timestamp when the bookmark was created',
    example: '2025-01-15T10:30:00.000Z',
  })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({
    description: 'Timestamp when the bookmark was last updated',
    example: '2025-01-15T10:30:00.000Z',
  })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
