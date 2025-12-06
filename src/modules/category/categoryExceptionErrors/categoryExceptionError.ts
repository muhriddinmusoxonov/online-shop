import { HttpException } from '@nestjs/common';

export class CategoryIsAlreadyExist extends HttpException {
  constructor() {
    super('Category is already exist', 400);
  }
}

export class CategoryIsNotFound extends HttpException {
  constructor() {
    super('Category is not found', 404);
  }
}
