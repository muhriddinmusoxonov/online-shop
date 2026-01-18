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
    const authHeader = request.headers.authorization;
    const token = authHeader.split(' ')[1];


    if (!token) {
      throw new UnauthorizedException('Reset token required');
    }

    console.log(token, typeof token);


    const user = await redis.get(`reset:${token}`);
    console.log(user);


    if (!user) {
      throw new UnauthorizedException('Invalid or expired reset token');
    }

    const userData = JSON.parse(user.toString());

    request['userEmail'] = userData.registerData.email;
    request['registerToken'] = token;

    return true;
  }
}
