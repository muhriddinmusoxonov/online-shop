import { Document, Types } from 'mongoose';
export declare class Payment extends Document {
    order_id: Types.ObjectId;
    method: string;
    amount: number;
    status: string;
}
export declare const PaymentSchema: import("mongoose").Schema<Payment, import("mongoose").Model<Payment, any, any, any, Document<unknown, any, Payment, any, {}> & Payment & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Payment, Document<unknown, {}, import("mongoose").FlatRecord<Payment>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Payment> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
