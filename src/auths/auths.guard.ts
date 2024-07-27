import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import AppError from 'src/common/utils/customError';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.user) {
      throw new AppError(
        'You are not logged, Please login to continue',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return true;
  }
}
