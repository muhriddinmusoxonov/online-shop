"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
const product_exception_errors_1 = require("./productExceptionErrors/product.exception.errors");
const category_service_1 = require("../category/category.service");
const resData_1 = require("../../lib/resData");
const mongoose_1 = require("@nestjs/mongoose");
const user_service_1 = require("../user/user.service");
const userExceptionErrors_1 = require("../user/excpetionErrors/userExceptionErrors");
const categoryExceptionError_1 = require("../category/categoryExceptionErrors/categoryExceptionError");
let ProductController = class ProductController {
    constructor(productService, categoryService, userService) {
        this.productService = productService;
        this.categoryService = categoryService;
        this.userService = userService;
    }
    async create(createProductDto) {
        const user = await this.userService.findOneById(createProductDto.user_id);
        if (user === null)
            throw new userExceptionErrors_1.UserIsNotFound();
        const category = await this.categoryService.findOneId(createProductDto.category_id);
        if (category === null)
            throw new categoryExceptionError_1.CategoryIsNotFound();
        const data = await this.productService.create(createProductDto);
        return new resData_1.ResData(201, 'created', data);
    }
    async findAll() {
        const data = await this.productService.findAll();
        return new resData_1.ResData(200, 'success', data);
    }
    async findOne(id) {
        const data = await this.productService.findOneById(id);
        if (data === null)
            throw new product_exception_errors_1.ProductIsNotFound();
        return new resData_1.ResData(200, 'success', data);
    }
    async update(id, updateProductDto) {
        await this.findOne(id);
        if (updateProductDto.image_url && updateProductDto.image_url !== null) {
            if (!updateProductDto.image_url.length) {
                throw new common_1.HttpException('Image is required', 400);
            }
        }
        const data = await this.productService.update(id, updateProductDto);
        return new resData_1.ResData(200, 'success', data);
    }
    async remove(id) {
        await this.findOne(id);
        const data = await this.productService.remove(id);
        return new resData_1.ResData(200, 'success', data);
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', new mongoose_1.ParseObjectIdPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', new mongoose_1.ParseObjectIdPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', new mongoose_1.ParseObjectIdPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "remove", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        category_service_1.CategoryService,
        user_service_1.UserService])
], ProductController);
//# sourceMappingURL=product.controller.js.map