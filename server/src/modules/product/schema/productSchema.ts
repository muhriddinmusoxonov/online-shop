import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Category } from 'src/modules/category/schema/category.schema';
import { User } from 'src/modules/user/schema/user.schema';

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({ required: true, type: String, unique: false })
  name: string;

  @Prop({ required: true, type: String, unique: true })
  slug: string;

  @Prop({ options: true, type: String })
  description: string;

  @Prop({ required: true, min: 0, type: Number })
  price: number;

  @Prop({ default: 0, min: 0, type: Number })
  stock: number;

  @Prop({
    type: Types.ObjectId,
    ref: Category.name,
    required: true,
  })
  category_id: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: true,
  })
  user_id: Types.ObjectId;

  @Prop({ type: [String], default: [] })
  image_url: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
