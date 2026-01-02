import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { redis } from 'src/common/providers/redis.provider';

@Injectable()
export class RegisterVerifyGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'] as string;
    const token =
      authHeader && authHeader.startsWith('Bearer ')
        ? authHeader.split(' ')[1]
        : null;

    if (!token) {
      throw new UnauthorizedException('Reset token required');
    }

    const user = await redis.get(`reset:${token}`);

    if (!user) {
      throw new UnauthorizedException('Invalid or expired reset token');
    }

    const userData = JSON.parse(user.toString());

    request['userEmail'] = userData.registerData.email;
    request['registerToken'] = token;

    return true;
  }
}
