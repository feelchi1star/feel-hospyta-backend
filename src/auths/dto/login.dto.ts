import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @IsString()
  @IsNotEmpty({ message: 'Provide your email' })
  email: string;
  @IsString()
  @IsNotEmpty({ message: 'Provide your password' })
  password: string;
}
