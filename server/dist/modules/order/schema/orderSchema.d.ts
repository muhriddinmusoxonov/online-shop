import { Document, Types } from 'mongoose';
declare class OrderItem {
    product_id: Types.ObjectId;
    name: string;
    quantity: number;
    price: number;
}
export declare class Order extends Document {
    user_id: Types.ObjectId;
    items: OrderItem[];
    total_price: number;
    status: string;
}
export declare const OrderSchema: import("mongoose").Schema<Order, import("mongoose").Model<Order, any, any, any, Document<unknown, any, Order, any, {}> & Order & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Order, Document<unknown, {}, import("mongoose").FlatRecord<Order>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Order> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export {};
