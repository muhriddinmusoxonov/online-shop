"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCheckNameOrCategoryId = exports.ProductIsNotFound = exports.IsCategoryIdNotObjectId = exports.ProductIsAlreadyExist = void 0;
const common_1 = require("@nestjs/common");
class ProductIsAlreadyExist extends common_1.HttpException {
    constructor() {
        super('Product is already exist', 400);
    }
}
exports.ProductIsAlreadyExist = ProductIsAlreadyExist;
class IsCategoryIdNotObjectId extends common_1.HttpException {
    constructor() {
        super('categoryId is not a valid ObjectId', 400);
    }
}
exports.IsCategoryIdNotObjectId = IsCategoryIdNotObjectId;
class ProductIsNotFound extends common_1.HttpException {
    constructor() {
        super('Product is not found', 404);
    }
}
exports.ProductIsNotFound = ProductIsNotFound;
class ProductCheckNameOrCategoryId extends common_1.HttpException {
    constructor() {
        super('Please check product name or category_id', 400);
    }
}
exports.ProductCheckNameOrCategoryId = ProductCheckNameOrCategoryId;
//# sourceMappingURL=product.exception.errors.js.map