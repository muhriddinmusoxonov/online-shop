import { Document, Types } from 'mongoose';
declare class CartItem {
    product_id: Types.ObjectId;
    quantity: number;
    subtotal: number;
}
export declare class Cart extends Document {
    user_id: Types.ObjectId;
    items: CartItem[];
}
export declare const CartSchema: import("mongoose").Schema<Cart, import("mongoose").Model<Cart, any, any, any, Document<unknown, any, Cart, any, {}> & Cart & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Cart, Document<unknown, {}, import("mongoose").FlatRecord<Cart>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Cart> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export {};
