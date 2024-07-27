import { Module, forwardRef } from '@nestjs/common';
import { VotesService } from './votes.service';
import { VotesController } from './votes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Vote, VoteSchema } from './entities/vote.entity';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports: [
    forwardRef(() =>
      MongooseModule.forFeature([{ name: Vote.name, schema: VoteSchema }]),
    ),
    PostsModule,
  ],
  controllers: [VotesController],
  providers: [VotesService],
  exports: [VotesService],
})
export class VotesModule {}
