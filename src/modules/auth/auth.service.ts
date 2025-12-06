import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../user/schema/user.schema';
import { JwtService } from '@nestjs/jwt';

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
        expiresIn: '15m',
      },
    );
    return token;
  }
}
