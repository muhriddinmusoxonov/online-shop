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
exports.ResetCodeGuard = void 0;
const common_1 = require("@nestjs/common");
const redis_provider_1 = require("../common/providers/redis.provider");
let ResetCodeGuard = class ResetCodeGuard {
    constructor() { }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];
        const token = authHeader && authHeader.startsWith('Bearer ')
            ? authHeader.split(' ')[1]
            : null;
        if (!token) {
            throw new common_1.UnauthorizedException('Reset token required');
        }
        const user = await redis_provider_1.redis.get(`reset:${token}`);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid or expired reset token');
        }
        const userId = JSON.parse(user.toString());
        request['userId'] = userId.userId;
        return true;
    }
};
exports.ResetCodeGuard = ResetCodeGuard;
exports.ResetCodeGuard = ResetCodeGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ResetCodeGuard);
//# sourceMappingURL=reset-code.guard.js.map