import { IsUrl, IsNotEmpty } from 'class-validator';
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
}
