// src/comments/comments.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async addComment(
    postId: string,
    userId: string,
    content: string,
  ): Promise<Comment> {
    const comment = new this.commentModel({
      content,
      user: userId,
      post: postId,
    });
    return await comment.save();
  }

  async getCommentsForPost(postId: string): Promise<Comment[]> {
    return await this.commentModel
      .find({ post: postId })
      .populate('user', 'username picture') // Populate user information
      .populate('parent'); // Populate parent comment for replies if needed
  }
}
