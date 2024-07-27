import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { ECategory } from '../entities/post.entity';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  content: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  image: string;

  @IsNotEmpty()
  @IsEnum(ECategory)
  category: string;

  @ValidateIf((o) => !o.content && !o.image)
  @IsNotEmpty({ message: 'Either content text or an image must be provided.' })
  bothCannotBeAbsent: any; // Dummy property to trigger validation
}
