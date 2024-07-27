import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ECategory } from '../entities/post.entity';

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsEnum(ECategory)
  category?: string;
}
