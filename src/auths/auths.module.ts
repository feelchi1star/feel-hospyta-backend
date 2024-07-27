import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { AuthsController } from './auths.controller';
import { UsersModule } from 'src/users/users.module';
import { AuthenticatedUserDeserialerMiddleware } from './auths.middleware';

@Module({
  controllers: [AuthsController],
  providers: [AuthsService],
  imports: [UsersModule],
})
export class AuthsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticatedUserDeserialerMiddleware).forRoutes('*');
  }
}
