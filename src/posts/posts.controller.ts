import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Req,
  UseGuards,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';

import { Request } from 'express';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from 'src/auths/auths.guard';
import AppError from 'src/common/utils/customError';
import { VotesService } from 'src/votes/votes.service';
import {
  CreateVoteDto,
  CreateVoteDtoFromPost,
} from 'src/votes/dto/create-vote.dto';
import { CommentService } from 'src/comment/comment.service';
import { Comment } from 'src/comment/entities/comment.entity';
import { BaseParam } from 'src/auths/dto/baseParams';
import { BaseQueryApiFeaturesDTO } from 'src/common/utils/apiFeatures';
import { PostQuertyDTO } from './dto/PostQuery.dto';

@Controller('posts')
@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
  }),
)
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly votesService: VotesService,
    private readonly commentsService: CommentService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
    const userId = req['user']._id; // Get the user ID from the request
    return await this.postsService.create(createPostDto, userId);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Req() req: Request,
    @Param() id: BaseParam,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    const userId = req['user']._id; // Get the user ID from the request
    return await this.postsService.update(id.id, userId, updatePostDto);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Req() req: Request, @Param() id: BaseParam) {
    const userId = req['user']._id; // Get the user ID from the request
    await this.postsService.delete(id.id, userId);
    return { message: 'Deleted Successfully' };
  }

  // Aggregation
  @Get()
  async findAll(@Query() query: PostQuertyDTO) {
    return await this.postsService.findAll(query);
  }

  // Aggregation
  @Get(':id')
  async findById(@Param() id: BaseParam) {
    const post = await this.postsService.findById(id.id);
    if (!post) {
      throw new AppError('Post not found', HttpStatus.NOT_FOUND);
    }
    return post;
  }

  @Get(':id/votes/vote')
  async findOne(@Param() id: BaseParam, @Req() req: Request) {
    const userId = req['user']._id; // Get the user ID from the request
    return await this.votesService.findOne(id.id, userId);
  }
  @Delete(':id/votes/vote')
  async removeVote(@Param() id: BaseParam, @Req() req: Request) {
    const userId = req['user']._id; // Get the user ID from the request
    await this.votesService.remove(id.id, userId);
    return {
      message: 'Vote removed successfully',
    };
  }

  @UseGuards(AuthGuard)
  @Post(':id/votes')
  async voteAPost(
    @Body() createVoteDto: CreateVoteDtoFromPost,
    @Req() req: Request,
    @Param() id: BaseParam,
  ) {
    const userId = req['user']._id; // Get the user ID from the request
    const newVote = await this.votesService.create(userId, {
      ...createVoteDto,
      postId: id.id,
    });

    if (!newVote) {
      throw new AppError(
        'Unable to vote at the moment',
        HttpStatus.FAILED_DEPENDENCY,
      );
    }
    return newVote;
  }

  @UseGuards(AuthGuard)
  @Post(':id/comments')
  async addComment(
    @Param() postId: BaseParam,
    @Body('content') content: string,
    @Req() req: Request,
  ): Promise<Comment> {
    const userId = req['user']._id; // Get the user ID from the request
    return await this.commentsService.addComment(postId.id, userId, content);
  }

  @Get(':id/comments')
  async getComments(@Param() postId: BaseParam): Promise<Comment[]> {
    return await this.commentsService.getCommentsForPost(postId.id);
  }
}
