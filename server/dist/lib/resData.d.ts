interface IMeta {
    statusCode: number;
    message: string;
    [key: string]: string | number | object;
}
export declare class ResData<TData> {
    data: TData;
    meta: IMeta;
    constructor(statusCode: number, message: string, data: TData, meta?: Record<string, string | number | object>);
}
export {};
