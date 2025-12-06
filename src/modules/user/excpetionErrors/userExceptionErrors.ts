import { HttpException, HttpStatus } from '@nestjs/common';

export class UserIsNotFound extends HttpException {
  constructor() {
    super('user is not found', HttpStatus.NOT_FOUND);
  }
}

export class UserIsAlreadyExist extends HttpException {
  constructor() {
    super('user is already exist', HttpStatus.BAD_REQUEST);
  }
}
