import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from 'src/modules/product/schema/productSchema';
import { User } from 'src/modules/user/schema/user.schema';

class CartItem {
  @Prop({ type: Types.ObjectId, ref: Product.name })
  product_id: Types.ObjectId;

  @Prop({ default: 1 })
  quantity: number;

  @Prop()
  subtotal: number;
}

@Schema({ timestamps: true })
export class Cart extends Document {
  @Prop({ type: Types.ObjectId, ref: User.name })
  user_id: Types.ObjectId;

  @Prop({ type: [CartItem], default: [] })
  items: CartItem[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
