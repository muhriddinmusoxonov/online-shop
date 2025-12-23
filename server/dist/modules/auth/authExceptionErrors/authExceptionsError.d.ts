import { HttpException } from '@nestjs/common';
export declare class LoginOrPasswordIsWrong extends HttpException {
    constructor();
}
export declare class CodeIsWrong extends HttpException {
    constructor();
}
export declare class CodeIsExpired extends HttpException {
    constructor();
}
