"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryIsNotFound = exports.CategoryIsAlreadyExist = void 0;
const common_1 = require("@nestjs/common");
class CategoryIsAlreadyExist extends common_1.HttpException {
    constructor() {
        super('Category is already exist', 400);
    }
}
exports.CategoryIsAlreadyExist = CategoryIsAlreadyExist;
class CategoryIsNotFound extends common_1.HttpException {
    constructor() {
        super('Category is not found', 404);
    }
}
exports.CategoryIsNotFound = CategoryIsNotFound;
//# sourceMappingURL=categoryExceptionError.js.map