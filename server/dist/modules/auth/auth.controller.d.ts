import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '../user/user.service';
import { ResData } from 'src/lib/resData';
import { User } from '../user/schema/user.schema';
import { LoginDto } from './dto/login.dto';
import { MailService } from './send-mail.service';
import { SendCodeDto } from './dto/send.code.dto';
import { CheckCodeDto } from './dto/check.code.dto';
import { ResetCode } from './dto/reset.code.dto';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    private readonly mailService;
    constructor(authService: AuthService, userService: UserService, mailService: MailService);
    register(registerDto: RegisterDto): Promise<ResData<User>>;
    login(loginDto: LoginDto): Promise<ResData<User>>;
    sendCodeToEmail(sendCodeDto: SendCodeDto): Promise<ResData<null>>;
    checkCode(checkCode: CheckCodeDto, req: any, token: string): Promise<ResData<null>>;
    resetCode(resetCode: ResetCode, req: any): Promise<ResData<User>>;
}
