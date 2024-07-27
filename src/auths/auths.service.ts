import { HttpStatus, Injectable } from '@nestjs/common';
import AppError from 'src/common/utils/customError';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthsService {
  constructor(private readonly userService: UsersService) {}
  async login(payload: LoginDTO) {
    const validateUser = await this.userService.findByEmail(payload.email);

    if (
      !validateUser ||
      (validateUser && !(await validateUser.correctPassword(payload.password)))
    ) {
      throw new AppError('Invalid Credentials', HttpStatus.BAD_REQUEST);
    }

    return validateUser;
  }
  async signup(createAuthDto: CreateUserDto) {
    if (await this.userService.findByEmail(createAuthDto.email)) {
      throw new AppError('Email already exists', HttpStatus.CONFLICT);
    }
    // Check if username exists
    if (await this.userService.findByUsername(createAuthDto.username)) {
      throw new AppError('Username already exists', HttpStatus.CONFLICT);
    }
    return await this.userService.create(createAuthDto);
  }
}
