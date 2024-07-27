import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import AppError from 'src/common/utils/customError';
import ENV from 'src/common/config/ENV';
import { UsersService } from 'src/users/users.service';

/**
 * This is the Deserializer Middleware for the authenticated user context.
 * It verifies the JWT token from the authorization header and adds the
 * payload to the request object.
 *
 * @author Felix Chinonso
 * @see {@link https://github.com/feelchi1star}
 */
@Injectable()
export class AuthenticatedUserDeserialerMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const serverToken = req.headers?.authorization;
    if (!serverToken) {
      return next();
    }

    if (!serverToken.startsWith('Bearer ')) {
      throw new AppError(
        'Provide a valid authorization header',
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = serverToken.split(' ')[1];

    if (!token) {
      return next();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: ENV.jwtSecretKey,
      });
      const checkExistingUser = await this.userService.getMe(payload.sub);
      if (!checkExistingUser) {
        return next();
      }

      req['user'] = checkExistingUser;
    } catch (error) {
      console.error('Token verification error:', error);

      if (error.name === 'TokenExpiredError') {
        return next(new AppError('Token expired', HttpStatus.UNAUTHORIZED));
      } else if (error.name === 'JsonWebTokenError') {
        return next(new AppError('Invalid token', HttpStatus.UNAUTHORIZED));
      } else {
        return next(
          new AppError('Token verification failed', HttpStatus.UNAUTHORIZED),
        );
      }
    }

    return next();
  }
}
