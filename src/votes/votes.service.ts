import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateVoteDto } from './dto/create-vote.dto';
import { PostsService } from 'src/posts/posts.service';
import AppError from 'src/common/utils/customError';
import { Model } from 'mongoose';
import { Vote, VoteDocument } from './entities/vote.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class VotesService {
  constructor(
    private readonly postService: PostsService,
    @InjectModel(Vote.name) private readonly voteModel: Model<VoteDocument>,
  ) {}
  async create(userId: string, createVoteDto: CreateVoteDto) {
    const findPost = await this.postService.findById(createVoteDto.postId);
    if (!findPost) {
      throw new AppError('Post no found', HttpStatus.NOT_FOUND);
    }
    const existingVote = await this.voteModel.findOne({
      post: createVoteDto.postId,
      user: userId,
    });
    if (existingVote) {
      existingVote.type = createVoteDto.type;
      existingVote.updatedAt = new Date();
      return await existingVote.save();
    }

    const newVote = new this.voteModel({
      user: userId,
      post: createVoteDto.postId,
      type: createVoteDto.type,
    });

    const savedVote = await newVote.save();

    return savedVote;
  }

  async findOne(postId: string, userId: string) {
    const voteFn = await this.voteModel.findOne({ user: userId, post: postId });
    if (!voteFn) {
      throw new AppError('No Vote', HttpStatus.FOUND);
    }
    return voteFn;
  }

  async remove(id: string, userId: string) {
    const vote = await this.voteModel.findOne({
      post: id,
      user: userId,
    });
    if (!vote) {
      throw new AppError("You haven't Vote", HttpStatus.NOT_FOUND);
    }
    await vote.deleteOne();
  }
}
