import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { redis } from 'src/common/providers/redis.provider';

@Injectable()
export class ResetCodeGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'] as string; // 'Bearer <token>'
    const token =
      authHeader && authHeader.startsWith('Bearer ')
        ? authHeader.split(' ')[1] // 'Bearer ' dan keyingi qismi token bo'ladi
        : null;

    if (!token) {
      throw new UnauthorizedException('Reset token required');
    }

    // Redisdan user._id ni olish
    const user = await redis.get(`reset:${token}`);

    if (!user) {
      throw new UnauthorizedException('Invalid or expired reset token');
    }

    const userId = JSON.parse(user.toString());

    // Foydalanuvchi ID sini request ga qo‘shib yuborish
    request['userId'] = userId.userId;

    return true; // Guard muvaffaqiyatli bo‘ldi
  }
}
