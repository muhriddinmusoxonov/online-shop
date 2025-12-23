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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const userExceptionErrors_1 = require("./excpetionErrors/userExceptionErrors");
const resData_1 = require("../../lib/resData");
const mongoose_1 = require("@nestjs/mongoose");
const roles_guard_1 = require("../../Guards/roles.guard");
const jwt_auth_guard_1 = require("../../Guards/jwt-auth.guard");
const passport_1 = require("@nestjs/passport");
const roles_decorator_1 = require("../../middleware/roles.decorator");
const bcrypt = require("bcrypt");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async create(createUserDto) {
        const user = await this.userService.findByEmail(createUserDto.email);
        if (user !== null)
            throw new userExceptionErrors_1.UserIsAlreadyExist();
        const byPhone = await this.userService.findByPhone(createUserDto.phone);
        if (byPhone !== null)
            throw new userExceptionErrors_1.UserIsAlreadyExist();
        const hashPass = await bcrypt.hash(createUserDto.password, 10);
        createUserDto.password = hashPass;
        const data = await this.userService.create(createUserDto);
        return new resData_1.ResData(201, 'created', data);
    }
    async findAll() {
        const data = await this.userService.findAll();
        return new resData_1.ResData(200, 'success', data);
    }
    async findOne(id) {
        const user = await this.userService.findOneById(id);
        if (user === null)
            throw new userExceptionErrors_1.UserIsNotFound();
        return new resData_1.ResData(200, 'success', user);
    }
    async update(id, updateUserDto) {
        const user = await this.userService.findOneById(id);
        if (user === null)
            throw new userExceptionErrors_1.UserIsNotFound();
        if (updateUserDto.email) {
            const data = await this.userService.findByEmail(updateUserDto.email);
            if (data !== null && String(data._id) !== String(user._id)) {
                throw new userExceptionErrors_1.UserIsAlreadyExist();
            }
        }
        if (updateUserDto.phone) {
            const data = await this.userService.findByPhone(updateUserDto.phone);
            if (data !== null && String(data._id) !== String(user._id)) {
                throw new userExceptionErrors_1.UserIsAlreadyExist();
            }
        }
        if (updateUserDto.password) {
            const hashPass = await bcrypt.hash(updateUserDto.password, 10);
            updateUserDto.password = hashPass;
        }
        const data = await this.userService.update(id, updateUserDto);
        return new resData_1.ResData(200, 'success', data);
    }
    async remove(id) {
        await this.findOne(id);
        const data = await this.userService.remove(id);
        return new resData_1.ResData(200, 'success', data);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard, jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_decorator_1.Roles)('admin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', mongoose_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', new mongoose_1.ParseObjectIdPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', new mongoose_1.ParseObjectIdPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "remove", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map