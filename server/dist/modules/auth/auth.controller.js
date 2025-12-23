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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const register_dto_1 = require("./dto/register.dto");
const user_service_1 = require("../user/user.service");
const userExceptionErrors_1 = require("../user/excpetionErrors/userExceptionErrors");
const resData_1 = require("../../lib/resData");
const login_dto_1 = require("./dto/login.dto");
const authExceptionsError_1 = require("./authExceptionErrors/authExceptionsError");
const send_mail_service_1 = require("./send-mail.service");
const send_code_dto_1 = require("./dto/send.code.dto");
const generateCode_1 = require("../../lib/generateCode");
const redis_provider_1 = require("../../common/providers/redis.provider");
const check_code_dto_1 = require("./dto/check.code.dto");
const reset_code_guard_1 = require("../../Guards/reset-code.guard");
const reset_code_dto_1 = require("./dto/reset.code.dto");
let AuthController = class AuthController {
    constructor(authService, userService, mailService) {
        this.authService = authService;
        this.userService = userService;
        this.mailService = mailService;
    }
    async register(registerDto) {
        const user = await this.userService.findByEmail(registerDto.email);
        if (user !== null)
            throw new userExceptionErrors_1.UserIsAlreadyExist();
        const byPhone = await this.userService.findByPhone(registerDto.phone);
        if (byPhone !== null)
            throw new userExceptionErrors_1.UserIsAlreadyExist();
        const password = await this.authService.hashPassword(registerDto.password);
        registerDto.password = password;
        const registerEmailToken = await this.authService.generateResetCodeToken(registerDto.email);
        const userdata = await this.userService.create(registerDto);
        const token = await this.authService.generateToken(userdata);
        return new resData_1.ResData(201, 'created', userdata, { token: token });
    }
    async login(loginDto) {
        const user = await this.userService.findByEmail(loginDto.email);
        if (!user)
            throw new userExceptionErrors_1.UserIsNotFound();
        const checkPassword = await this.authService.comparePasswor(loginDto.password, user.password);
        if (!checkPassword)
            throw new authExceptionsError_1.LoginOrPasswordIsWrong();
        const token = await this.authService.generateToken(user);
        return new resData_1.ResData(200, 'success', user, { token: token });
    }
    async sendCodeToEmail(sendCodeDto) {
        const user = await this.userService.findByEmail(sendCodeDto.email);
        if (user === null)
            throw new userExceptionErrors_1.UserIsNotFound();
        const code = await (0, generateCode_1.generateCode)();
        const token = await this.authService.generateResetCodeToken(String(user._id));
        await this.authService.saveResetCode(String(user._id), token, code);
        await this.mailService.sendMail({
            to: user.email,
            subject: 'Password Reset Code',
            text: `Your reset password code: ${code}`,
        });
        return new resData_1.ResData(200, 'success', null, { token });
    }
    async checkCode(checkCode, req, token) {
        const id = req['userId'];
        const user = await this.userService.findOneById(id);
        if (user === null)
            throw new userExceptionErrors_1.UserIsNotFound();
        const userRedis = await redis_provider_1.redis.get(`reset:${token}`);
        const code = JSON.parse(userRedis.toString()).code;
        if (Number(code) !== checkCode.code)
            throw new authExceptionsError_1.CodeIsWrong();
        const resetToken = await this.authService.generateResetCodeToken(id);
        const codeRedis = '1234';
        await this.authService.saveResetCode(id, resetToken, codeRedis);
        return new resData_1.ResData(200, 'success', null, { token: resetToken });
    }
    async resetCode(resetCode, req) {
        const id = req['userId'];
        const user = await this.userService.findOneById(id);
        if (user === null)
            throw new userExceptionErrors_1.UserIsNotFound();
        const hashPassword = await this.authService.hashPassword(resetCode.code);
        const newUser = await this.userService.update(id, {
            password: hashPassword,
        });
        return new resData_1.ResData(200, 'success', newUser);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_code_dto_1.SendCodeDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "sendCodeToEmail", null);
__decorate([
    (0, common_1.Post)('check-code'),
    (0, common_1.UseGuards)(reset_code_guard_1.ResetCodeGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Headers)('reset-token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [check_code_dto_1.CheckCodeDto, Object, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "checkCode", null);
__decorate([
    (0, common_1.Post)('reset-code'),
    (0, common_1.UseGuards)(reset_code_guard_1.ResetCodeGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_code_dto_1.ResetCode, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetCode", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService,
        send_mail_service_1.MailService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map