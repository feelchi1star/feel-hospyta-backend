// src/posts/posts.service.ts
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Post, PostDocument } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import AppError from 'src/common/utils/customError';
import APIFeatures, {
  BaseQueryApiFeaturesDTO,
} from 'src/common/utils/apiFeatures';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async create(createPostDto: CreatePostDto, userId: string): Promise<Post> {
    const post = new this.postModel({
      ...createPostDto,
      user: userId,
    });
    return await post.save();
  }

  async update(
    id: string,
    userId: string,
    updatePostDto: UpdatePostDto,
  ): Promise<Post> {
    const updatedPost = await this.postModel.findOneAndUpdate(
      { _id: id, user: userId },
      updatePostDto,
      { new: true, runValidators: true },
    );

    if (!updatedPost) {
      throw new AppError(
        'Post not found or you do not have permission to update this post.',
        HttpStatus.NOT_FOUND,
      );
    }
    return updatedPost;
  }

  async delete(id: string, userId: string) {
    const post = await this.postModel.findOne({
      _id: id,
      user: userId,
    });
    if (!post) {
      throw new AppError(
        'Post no found or Post is already deleted',
        HttpStatus.NOT_FOUND,
      );
    }
    await post.deleteOne();
  }
  async findAll(query: BaseQueryApiFeaturesDTO): Promise<Post[]> {
    const features = new APIFeatures(this.postModel.find(), query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const posts = await features
      .getQuery()
      .populate('totalUpvotes')
      .populate('totalDownvotes')
      .populate('totalComments')
      .populate('user', '-createdAt -updatedAt -email');

    return posts; // Return the posts after the query
  }

  async findById(id: string): Promise<Post | null> {
    return await this.postModel
      .findOne({ _id: id })
      .populate('totalUpvotes')
      .populate('totalDownvotes')
      .populate('totalComments')
      .populate('user', '-createdAt -updatedAt -email');
  }
}
