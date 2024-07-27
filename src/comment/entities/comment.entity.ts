import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { Post } from 'src/posts/entities/post.entity';

export type CommentDocument = Comment & Document;

@Schema({ timestamps: true })
export class Comment {
  @Prop({ required: true, type: SchemaTypes.String })
  content: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: User.name })
  user: string; // Reference to User

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'Post' })
  post: string; // Reference to Post

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Comment' })
  parent?: string; // Reference to parent comment for replies
}

const CommentSchema = SchemaFactory.createForClass(Comment);
CommentSchema.loadClass(Comment);
export { CommentSchema };
