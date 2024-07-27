import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { modelIdTransformer } from 'src/common/utils/modelIdTransformer';
import bcrypt from 'bcryptjs';

export type UserDocument = User & Document;

@Schema({
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: modelIdTransformer,
  },
  timestamps: true,
})
export class User {
  @Prop({ unique: true, lowercase: true })
  email: string;
  @Prop({ required: true, unique: true, lowercase: true })
  username: string;
  @Prop({ required: true, select: false })
  password: string; // Store hashed passwords

  @Prop({ type: SchemaTypes.String, required: true })
  fullname: string; // user's name

  @Prop({
    default:
      'https://www.diabetes.ie/wp-content/uploads/2017/02/no-image-available.png',
    type: SchemaTypes.String,
  })
  picture: string; // user's profile picture
  async correctPassword(userPassword: string): Promise<boolean> {
    return bcrypt.compare(userPassword, this.password);
  }
  cleanSensitiveField(): this {
    this.password = undefined;
    return this;
  }
}

const UserSchema = SchemaFactory.createForClass(User);
// Pre-save hook to hash password
UserSchema.pre<UserDocument>('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

UserSchema.loadClass(User);
export { UserSchema };
