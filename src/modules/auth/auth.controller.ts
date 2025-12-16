import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
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
import { MailService } from './send-mail.service';
import { SendCodeDto } from './dto/send.code.dto';
import { generateCode } from 'src/lib/generateCode';
import { redis } from 'src/common/providers/redis.provider';
import { CheckCodeDto } from './dto/check.code.dto';
import { ResetCodeGuard } from 'src/Guards/reset-code.guard';

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

  //. -------------------------> ForGot Password <----------------------------------\\
  //'forgot-password'
  @Post('forgot-password')
  async sendCodeToEmail(@Body() sendCodeDto: SendCodeDto) {
    const user = await this.userService.findByEmail(sendCodeDto.email);
    if (user === null) throw new UserIsNotFound();

    const code = await generateCode();

    const token = await this.authService.generateResetCodeToken(
      String(user._id),
    );

    await this.authService.saveResetCode(String(user._id), token, code);

    await this.mailService.sendMail({
      to: user.email,
      subject: 'Password Reset Code',
      text: `Your reset password code: ${code}`,
    });

    return new ResData<string>(200, 'success', token);
  }

  //'check-code'
  @Post('check-code')
  @UseGuards(ResetCodeGuard)
  async checkCode(@Body() checkCode: CheckCodeDto, @Req() req) {
    const id = req['userId'];

    const user = await this.userService.findOneById(id);
    if (user === null) throw new UserIsNotFound();

    return new ResData<User>(200, 'success', user);
  }
  // 3.user bo'lmasa error qaytariladi.
  // 4.redis dan chaqirib code tekshiriladi.
  // 5.code expired bo'lsa yoki xato bo'lsa error qaytariladi.
  // 6.to'g'ri bo'lsa success qaytariladi.

  // 'reset-password'
  // 1.tokendan kelgan user_id orqali user bor yoki yo'qligi tekshiriladi.
  // 2.agar topilmasa error qaytariladi.
  // 3.body orqli qabul qilingan newPassword va confirmPassword tekshiriladi.
  // 4.agar xato bo'lsa error qaytariladi.
  // 5.keyin user ni newPasswordi hashlanadi.
  // 6.user ni passwordi update qilib qo'yiladi.
  // 7.ResData da success qaytariladi.
}
