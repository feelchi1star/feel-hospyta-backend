import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Comment } from 'src/comment/entities/comment.entity';
import { modelIdTransformer } from 'src/common/utils/modelIdTransformer';
import { User } from 'src/users/entities/user.entity';
import { Vote } from 'src/votes/entities/vote.entity';

export enum ECategory {
  KIDNEY = 'kidney',
  HEADACHE = 'headache',
  STOMACHACHE = 'stomachache',
  LEG_PAIN = 'leg_pain',
  MALARIA = 'malaria',
}
export type PostDocument = Post & Document;

@Schema({
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: modelIdTransformer,
  },
  toObject: {
    virtuals: true,
  },
  timestamps: true,
})
export class Post {
  @Prop({ required: true, type: SchemaTypes.String })
  content: string;

  @Prop({ type: SchemaTypes.String })
  image: string;

  @Prop({ required: true, enum: ECategory })
  category: ECategory;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: User.name })
  user: string; // Reference to the User model
}

const PostSchema = SchemaFactory.createForClass(Post);
PostSchema.loadClass(Post);

// Virtual field for total upvotes
PostSchema.virtual('totalUpvotes', {
  ref: Vote.name,
  localField: '_id',
  foreignField: 'post',
  count: true,
  match: { type: 'upvote' },
});

// Virtual field for total downvotes
PostSchema.virtual('totalDownvotes', {
  ref: Vote.name,
  localField: '_id',
  foreignField: 'post',
  count: true,
  match: { type: 'downvote' },
});

// Virtual field for total comments
PostSchema.virtual('totalComments', {
  ref: Comment.name,
  localField: '_id',
  foreignField: 'post',
  count: true,
});

export { PostSchema };
