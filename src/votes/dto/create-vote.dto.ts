import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { EVote } from '../entities/vote.entity';

export class CreateVoteDtoFromPost {
  @IsNotEmpty()
  @IsEnum(EVote)
  type: EVote;
}
export class CreateVoteDto extends CreateVoteDtoFromPost {
  @IsNotEmpty()
  @IsString()
  postId: string;
}
