import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string; // Handle password hashing in the service

  @IsString()
  @IsNotEmpty()
  fullname: string; //  user's name
  @IsEmail(undefined, { message: 'Provide a valid email' })
  @IsNotEmpty()
  email: string; //  user's name

  // @IsString()
  // picture: string; // Optional, user's profile picture
}
