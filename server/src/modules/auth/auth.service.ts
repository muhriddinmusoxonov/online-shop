import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../user/schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import { redis } from 'src/common/providers/redis.provider';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async hashPassword(password: string): Promise<string> {
    const hashPassword = await bcrypt.hash(password, 10);

    return hashPassword;
  }

  async generateToken(user: User): Promise<string> {
    const payload = {
      sub: user._id,
      username: user.full_name,
      role: user.role,
    };

    const token = await this.jwtService.signAsync(payload);

    return token;
  }

  async comparePasswor(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    const checking = await bcrypt.compare(password, hashPassword);

    return checking;
  }

  async generateResetCodeToken(id: string): Promise<string> {
    const token = await this.jwtService.signAsync(
      { _id: id },
      {
        secret: process.env.FORGOTP_SECRET,
        expiresIn: '600',
      },
    );
    return token;
  }

  async saveResetCode(
    userId: string,
    token: string,
    code: string,
  ): Promise<string> {
    await redis.set(`reset:${token}`, JSON.stringify({ code, userId }), {
      EX: 63,
    });

    return 'success';
  }

  async saveRegisterResetCode(registerData: RegisterDto, token: string, code: string): Promise<string> {
    await redis.set(`reset:${token}`, JSON.stringify({ registerData, code }), { EX: 63 });

    return 'success';
  }

  async getResetCode(token: string) {
    const data = await redis.get(`reset:${token}`);
    return data ? JSON.parse(data.toString()) : null;
  }
}
