import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class ResetCodeGuard implements CanActivate {
    constructor();
    canActivate(context: ExecutionContext): Promise<boolean>;
}
