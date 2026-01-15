import { IsUrl, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookmarkDto {
  @ApiProperty({
    description: 'Updated URL for the bookmark',
    example: 'https://www.facebook.com/example/posts/12345',
    required: false,
    maxLength: 2048,
  })
  @IsUrl()
  @IsOptional()
  url?: string;

  @ApiProperty({
    description: 'Updated title for the bookmark',
    example: 'Updated Foodie Title',
    required: false,
    maxLength: 255,
  })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  title?: string;

  @ApiProperty({
    description: 'Updated description or notes about the bookmark',
    example: 'Important resource for learning advanced TypeScript patterns',
    required: false,
    maxLength: 1000,
  })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  description?: string;
}
