import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '../user/user.service';
import {
  UserIsAlreadyExist,
  UserIsNotFound,
} from '../user/excpetionErrors/userExceptionErrors';
import { ResData } from 'src/lib/resData';
import { User } from '../user/schema/user.schema';
import { LoginDto } from './dto/login.dto';
import { LoginOrPasswordIsWrong } from './authExceptionErrors/authExceptionsError';
import { SendCodeDto } from './dto/send.code.dto';
import { generateCode } from 'src/lib/generateCode';
import { MailService } from './send-mail.service';
import { redis } from 'src/common/providers/redis.provider';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly mailService: MailService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.userService.findByEmail(registerDto.email);

    if (user !== null) throw new UserIsAlreadyExist();

    const byPhone = await this.userService.findByPhone(registerDto.phone);
    if (byPhone !== null) throw new UserIsAlreadyExist();

    const password = await this.authService.hashPassword(registerDto.password);

    registerDto.password = password;

    const userdata = await this.userService.create(registerDto);

    const token = await this.authService.generateToken(userdata);

    return new ResData<User>(201, 'created', userdata, { token: token });
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);
    if (!user) throw new UserIsNotFound();

    const checkPassword = await this.authService.comparePasswor(
      loginDto.password,
      user.password,
    );

    if (!checkPassword) throw new LoginOrPasswordIsWrong();

    const token = await this.authService.generateToken(user);

    return new ResData<User>(200, 'success', user, { token: token });
  }

  @Post('forgot-password')
  async sendCode(@Body() sendCode: SendCodeDto) {
    const user = await this.userService.findByEmail(sendCode.email);
    if (user === null) throw new UserIsNotFound();

    const code = await generateCode();

    const token = await this.authService.generateResetCodeToken(
      String(user._id),
    );

    await redis.set(
      `email:${sendCode.email}`,
      JSON.stringify({ code, token }),
      { EX: 60 },
    );

    const data = await redis.get(`email:${sendCode.email}`);

    console.log(data);

    return new ResData<string>(200, 'success', String(user._id));
  }
}
