import { HttpException } from '@nestjs/common';
export declare class UserIsNotFound extends HttpException {
    constructor();
}
export declare class UserIsAlreadyExist extends HttpException {
    constructor();
}
