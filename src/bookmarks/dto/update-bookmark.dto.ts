import { IsUrl, IsOptional } from 'class-validator';
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
}
