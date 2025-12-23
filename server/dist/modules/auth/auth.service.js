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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const redis_provider_1 = require("../../common/providers/redis.provider");
let AuthService = class AuthService {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async hashPassword(password) {
        const hashPassword = await bcrypt.hash(password, 10);
        return hashPassword;
    }
    async generateToken(user) {
        const payload = {
            sub: user._id,
            username: user.full_name,
            role: user.role,
        };
        const token = await this.jwtService.signAsync(payload);
        return token;
    }
    async comparePasswor(password, hashPassword) {
        const checking = await bcrypt.compare(password, hashPassword);
        return checking;
    }
    async generateResetCodeToken(id) {
        const token = await this.jwtService.signAsync({ _id: id }, {
            secret: process.env.FORGOTP_SECRET,
            expiresIn: '600',
        });
        return token;
    }
    async saveResetCode(userId, token, code) {
        await redis_provider_1.redis.set(`reset:${token}`, JSON.stringify({ code, userId }), {
            EX: 60,
        });
        return 'success';
    }
    async getResetCode(token) {
        const data = await redis_provider_1.redis.get(`reset:${token}`);
        return data ? JSON.parse(data.toString()) : null;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map