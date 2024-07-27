import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AuthsService } from './auths.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import ENV from 'src/common/config/ENV';

@Controller('auth')
@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
  }),
)
export class AuthsController {
  constructor(
    private readonly authsService: AuthsService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('signup')
  async signup(@Body() createAuthDto: CreateUserDto) {
    const newUser = await this.authsService.signup(createAuthDto);
    newUser.cleanSensitiveField();
    return {
      message: 'Signup successfully',
      data: newUser,
    };
  }
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() payload: LoginDTO) {
    const user = await this.authsService.login(payload);
    const jwtpayload = { sub: user.id };

    return {
      message: 'Welcome back, ' + user.fullname,
      access_token: await this.jwtService.signAsync(jwtpayload),
      expiresIn: ENV.jwtExpiresIn,
    };
  }
}
