"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserIsAlreadyExist = exports.UserIsNotFound = void 0;
const common_1 = require("@nestjs/common");
class UserIsNotFound extends common_1.HttpException {
    constructor() {
        super('user is not found', common_1.HttpStatus.NOT_FOUND);
    }
}
exports.UserIsNotFound = UserIsNotFound;
class UserIsAlreadyExist extends common_1.HttpException {
    constructor() {
        super('user is already exist', common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.UserIsAlreadyExist = UserIsAlreadyExist;
//# sourceMappingURL=userExceptionErrors.js.map