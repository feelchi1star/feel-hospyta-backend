import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LoggerMiddleWare } from './common/middleware/logger.middleware';
import ENV from './common/config/ENV';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AuthsModule } from './auths/auths.module';
import { PostsModule } from './posts/posts.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    MongooseModule.forRoot(ENV.DATABASE_URL),
    JwtModule.register({
      global: true,
      secret: ENV.jwtSecretKey,
      signOptions: { expiresIn: ENV.jwtExpiresIn },
    }),
    UsersModule,
    AuthsModule,
    PostsModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  private readonly logger = new Logger(AppModule.name);

  async onApplicationBootstrap() {
    mongoose.connection.on('connected', () => {
      this.logger.log('Mongoose connection established successfully.');
    });

    mongoose.connection.on('error', (error) => {
      this.logger.error('Mongoose connection error:', error);
    });

    mongoose.connection.on('disconnected', () => {
      this.logger.warn('Mongoose connection disconnected.');
    });
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleWare).forRoutes('*');
  }
}
