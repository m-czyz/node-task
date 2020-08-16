import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ type: String })
  _id: string;

  @Prop()
  email: string;

  @Prop({ type: Date })
  lastFeedFetchDate: Date | undefined;
}

export const UserSchema = SchemaFactory.createForClass(User);
