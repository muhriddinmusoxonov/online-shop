import { HttpException } from '@nestjs/common';

export class ProductIsAlreadyExist extends HttpException {
  constructor() {
    super('Product is already exist', 400);
  }
}

export class IsCategoryIdNotObjectId extends HttpException {
  constructor() {
    super('categoryId is not a valid ObjectId', 400);
  }
}

export class ProductIsNotFound extends HttpException {
  constructor() {
    super('Product is not found', 404);
  }
}

export class ProductCheckNameOrCategoryId extends HttpException {
  constructor() {
    super('Please check product name or category_id', 400);
  }
}
