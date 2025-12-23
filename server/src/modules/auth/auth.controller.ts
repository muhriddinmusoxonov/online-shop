import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Headers,
} from '@nestjs/common';
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
import {
  CodeIsWrong,
  LoginOrPasswordIsWrong,
} from './authExceptionErrors/authExceptionsError';
import { MailService } from './send-mail.service';
import { SendCodeDto } from './dto/send.code.dto';
import { generateCode } from 'src/lib/generateCode';
import { redis } from 'src/common/providers/redis.provider';
import { CheckCodeDto } from './dto/check.code.dto';
import { ResetCodeGuard } from 'src/Guards/reset-code.guard';
import { ResetCode } from './dto/reset.code.dto';

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

    const registerEmailToken = await this.authService.generateResetCodeToken(registerDto.email);


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

  //. -------------------------> Forgot Password <----------------------------------\\
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

    return new ResData<null>(200, 'success', null, { token });
  }

  //'check-code'
  @Post('check-code')
  @UseGuards(ResetCodeGuard)
  async checkCode(
    @Body() checkCode: CheckCodeDto,
    @Req() req,
    @Headers('reset-token') token: string,
  ) {
    const id = req['userId'];

    const user = await this.userService.findOneById(id);
    if (user === null) throw new UserIsNotFound();

    const userRedis = await redis.get(`reset:${token}`);
    const code = JSON.parse(userRedis.toString()).code;

    if (Number(code) !== checkCode.code) throw new CodeIsWrong();

    const resetToken = await this.authService.generateResetCodeToken(id);

    const codeRedis = '1234';
    await this.authService.saveResetCode(id, resetToken, codeRedis);

    return new ResData<null>(200, 'success', null, { token: resetToken });
  }

  // 'reset-password'
  @Post('reset-code')
  @UseGuards(ResetCodeGuard)
  async resetCode(@Body() resetCode: ResetCode, @Req() req) {
    const id = req['userId'];

    const user = await this.userService.findOneById(id);
    if (user === null) throw new UserIsNotFound();

    const hashPassword = await this.authService.hashPassword(resetCode.code);

    const newUser = await this.userService.update(id, {
      password: hashPassword,
    });

    return new ResData<User>(200, 'success', newUser);
  }
}


// Register bo'limiga send kod qo'shish:
// 1. user create qilinishidan oldin emailga kod jo'natiladi.
// 2. keyin code redisga saqlanadi.
// 3. token email orqali yasaladi va redisga saqlanadi.
// 4. shu yerda register data lari ham redisga saqlanadi.
// 5. front check-code page iga o'tkazadi.
// 6. GUARD orqali tokendan email olinadi va email orqali user topiladi va redisdagi userResetCode user jo'natgan kod bilan tekshiriladi.
// 7. code to'g'ri bo'lsa mongoDb ga user create qilinadi.
