import { HttpException } from '@nestjs/common';
export declare class ProductIsAlreadyExist extends HttpException {
    constructor();
}
export declare class IsCategoryIdNotObjectId extends HttpException {
    constructor();
}
export declare class ProductIsNotFound extends HttpException {
    constructor();
}
export declare class ProductCheckNameOrCategoryId extends HttpException {
    constructor();
}
