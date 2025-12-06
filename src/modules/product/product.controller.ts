import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  IsCategoryIdNotObjectId,
  ProductCheckNameOrCategoryId,
  ProductIsAlreadyExist,
  ProductIsNotFound,
} from './productExceptionErrors/product.exception.errors';
import { CategoryService } from '../category/category.service';
import { isValidObjectId } from 'mongoose';
import { CategoryIsNotFound } from '../category/categoryExceptionErrors/categoryExceptionError';
import { ResData } from 'src/lib/resData';
import { Product } from './schema/productSchema';
import { ParseObjectIdPipe } from '@nestjs/mongoose';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
  ) {}

  @Post('create')
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productService.findByName(createProductDto.name);
    if (product !== null) {
      if (
        product.price === createProductDto.price &&
        String(product.category_id) === createProductDto.category_id
      ) {
        product.stock += createProductDto.stock;

        const { _id, ...newData } = product.toObject();

        const data = await this.productService.update(
          String(product._id),
          newData,
        );

        return new ResData<Product>(200, 'success', data);
      } else if (
        product.price !== createProductDto.price ||
        String(product.category_id) !== createProductDto.category_id
      ) {
        throw new ProductCheckNameOrCategoryId();
      }
    }

    if (!isValidObjectId(createProductDto.category_id)) {
      throw new IsCategoryIdNotObjectId();
    }

    const category = await this.categoryService.findOneId(
      createProductDto.category_id,
    );
    if (category === null) throw new CategoryIsNotFound();

    if (!createProductDto.image_url.length) {
      throw new HttpException('Image is required', 400);
    }

    const data = await this.productService.create(createProductDto);

    return new ResData<Product>(201, 'created', data);
  }
  @Get()
  async findAll() {
    const data = await this.productService.findAll();

    return new ResData<Product[]>(200, 'success', data);
  }

  @Get(':id')
  async findOne(@Param('id', new ParseObjectIdPipe()) id: string) {
    const data = await this.productService.findOneById(id);
    if (data === null) throw new ProductIsNotFound();

    return new ResData<Product>(200, 'success', data);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseObjectIdPipe()) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    await this.findOne(id);

    if (updateProductDto.name) {
      const product = await this.productService.findByName(
        updateProductDto.name,
      );
      if (product !== null) throw new ProductIsAlreadyExist();
    }

    if (updateProductDto.image_url && updateProductDto.image_url !== null) {
      if (!updateProductDto.image_url.length) {
        throw new HttpException('Image is required', 400);
      }
    }

    const data = await this.productService.update(id, updateProductDto);

    return new ResData<Product>(200, 'success', data);
  }

  @Delete(':id')
  async remove(@Param('id', new ParseObjectIdPipe()) id: string) {
    await this.findOne(id);
    const data = await this.productService.remove(id);

    return new ResData<Product>(200, 'success', data);
  }
}
