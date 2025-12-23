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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const productSchema_1 = require("./schema/productSchema");
const mongoose_2 = require("mongoose");
let ProductService = class ProductService {
    constructor(productModel) {
        this.productModel = productModel;
    }
    async create(createProductDto) {
        const data = await this.productModel.create(createProductDto);
        return data;
    }
    async findAll() {
        const data = await this.productModel.find();
        return data;
    }
    async findOneById(id) {
        const data = await this.productModel.findById(id);
        return data;
    }
    async update(id, updateProductDto) {
        const data = await this.productModel.findByIdAndUpdate(id, updateProductDto);
        return data;
    }
    async remove(id) {
        const data = await this.productModel.findByIdAndDelete(id);
        return data;
    }
    async findByName(name) {
        const product = await this.productModel.findOne({ name });
        return product;
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(productSchema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductService);
//# sourceMappingURL=product.service.js.map