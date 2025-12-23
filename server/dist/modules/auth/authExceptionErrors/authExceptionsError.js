"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeIsExpired = exports.CodeIsWrong = exports.LoginOrPasswordIsWrong = void 0;
const common_1 = require("@nestjs/common");
class LoginOrPasswordIsWrong extends common_1.HttpException {
    constructor() {
        super('Login or Password is wrong', 400);
    }
}
exports.LoginOrPasswordIsWrong = LoginOrPasswordIsWrong;
class CodeIsWrong extends common_1.HttpException {
    constructor() {
        super('Code is wrong', 400);
    }
}
exports.CodeIsWrong = CodeIsWrong;
class CodeIsExpired extends common_1.HttpException {
    constructor() {
        super('Code is expired', 400);
    }
}
exports.CodeIsExpired = CodeIsExpired;
//# sourceMappingURL=authExceptionsError.js.map