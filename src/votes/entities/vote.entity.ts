// src/votes/entities/vote.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../users/entities/user.entity';
import { Post } from '../../posts/entities/post.entity';
import { modelIdTransformer } from 'src/common/utils/modelIdTransformer';

export enum EVote {
  upvote = 'upvote',
  downvote = 'downvote',
}
export type VoteDocument = Vote & Document;

@Schema({
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: modelIdTransformer,
  },
  timestamps: true,
})
export class Vote {
  @Prop({ required: true, ref: 'User' })
  user: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, ref: 'Post' })
  post: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, enum: EVote })
  type: EVote; // "upvote" or "downvote"

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}
const VoteSchema = SchemaFactory.createForClass(Vote);
VoteSchema.loadClass(Vote);
export { VoteSchema };
