import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, minlength: 3, trim: true, type: String })
  full_name: string;

  @Prop({ required: true, unique: true, trim: true, type: String })
  email: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ required: true, unique: true, trim: true, type: Number })
  phone: number;

  @Prop({ default: 'customer', enum: ['admin', 'customer'] })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
