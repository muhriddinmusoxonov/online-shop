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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const category_schema_1 = require("./schema/category.schema");
const mongoose_2 = require("mongoose");
let CategoryService = class CategoryService {
    constructor(categoryModul) {
        this.categoryModul = categoryModul;
    }
    async create(createCategoryDto) {
        const data = await this.categoryModul.create(createCategoryDto);
        return data;
    }
    async findAll() {
        const data = await this.categoryModul.find();
        return data;
    }
    async findOneId(id) {
        const data = await this.categoryModul.findById(id);
        return data;
    }
    async update(id, updateCategoryDto) {
        const data = await this.categoryModul.findByIdAndUpdate(id, updateCategoryDto);
        return data;
    }
    async remove(id) {
        const data = await this.categoryModul.findByIdAndDelete(id);
        return data;
    }
    async findByName(name) {
        const data = await this.categoryModul.findOne({ name });
        return data;
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(category_schema_1.Category.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CategoryService);
//# sourceMappingURL=category.service.js.map