import {
  IsUrl,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookmarkDto {
  @ApiProperty({
    description:
      'Valid URL of the bookmark from social platforms (XHS, Facebook, Instagram, etc.)',
    example: 'https://www.instagram.com/p/example123/',
    required: true,
    maxLength: 2048,
  })
  @IsUrl()
  @IsNotEmpty()
  url: string;

  @ApiProperty({
    description: 'Title for the bookmark',
    example: 'Foodie',
    required: true,
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @ApiProperty({
    description: 'Optional description or notes about the bookmark',
    example: 'Saved for later reading about TypeScript best practices',
    required: false,
    maxLength: 1000,
  })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  description?: string;
}
