import { User } from '../user/schema/user.schema';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    hashPassword(password: string): Promise<string>;
    generateToken(user: User): Promise<string>;
    comparePasswor(password: string, hashPassword: string): Promise<boolean>;
    generateResetCodeToken(id: string): Promise<string>;
    saveResetCode(userId: string, token: string, code: string): Promise<string>;
    getResetCode(token: string): Promise<any>;
}
