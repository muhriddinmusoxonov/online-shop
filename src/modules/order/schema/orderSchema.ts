import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from 'src/modules/product/schema/productSchema';
import { User } from 'src/modules/user/schema/user.schema';

class OrderItem {
  @Prop({ type: Types.ObjectId, ref: Product.name })
  product_id: Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  quantity: number;

  @Prop()
  price: number;
}

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ type: Types.ObjectId, ref: User.name })
  user_id: Types.ObjectId;

  @Prop({ type: [OrderItem], default: [] })
  items: OrderItem[];

  @Prop({ required: true })
  total_price: number;

  @Prop({
    default: 'pending',
    enum: ['pending', 'paid', 'shipped', 'delivered'],
  })
  status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
