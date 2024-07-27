import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Post, PostSchema } from './entities/post.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { VotesService } from 'src/votes/votes.service';
import { Vote, VoteSchema } from 'src/votes/entities/vote.entity';
import { CommentService } from 'src/comment/comment.service';
import { Comment, CommentSchema } from 'src/comment/entities/comment.entity';

@Module({
  imports: [
    forwardRef(() =>
      MongooseModule.forFeature([
        { name: Post.name, schema: PostSchema },
        { name: Vote.name, schema: VoteSchema },
        { name: Comment.name, schema: CommentSchema },
      ]),
    ),
  ],
  controllers: [PostsController],
  providers: [PostsService, VotesService, CommentService],
})
export class PostsModule {}
