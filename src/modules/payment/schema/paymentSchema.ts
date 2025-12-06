import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Order } from 'src/modules/order/schema/orderSchema';

@Schema({ timestamps: true })
export class Payment extends Document {
  @Prop({ type: Types.ObjectId, ref: Order.name })
  order_id: Types.ObjectId;

  @Prop()
  method: string;

  @Prop()
  amount: number;

  @Prop({ default: 'pending', enum: ['pending', 'paid', 'failed'] })
  status: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
