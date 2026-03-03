import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({
    description: 'The title of the article',
    example: 'My Article',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The content of the article',
    example: 'This is my article content',
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
