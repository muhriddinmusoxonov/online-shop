import { HttpException } from '@nestjs/common';

export class LoginOrPasswordIsWrong extends HttpException {
  constructor() {
    super('Login or Password is wrong', 400);
  }
}

export class CodeIsWrong extends HttpException {
  constructor() {
    super('Code is wrong', 400);
  }
}

export class CodeIsExpired extends HttpException {
  constructor() {
    super('Code is expired', 400);
  }
}
