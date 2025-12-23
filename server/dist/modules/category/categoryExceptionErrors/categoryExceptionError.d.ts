import { HttpException } from '@nestjs/common';
export declare class CategoryIsAlreadyExist extends HttpException {
    constructor();
}
export declare class CategoryIsNotFound extends HttpException {
    constructor();
}
