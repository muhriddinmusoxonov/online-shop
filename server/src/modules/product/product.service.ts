import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schema/productSchema';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const data = await this.productModel.create(createProductDto);

    return data;
  }

  async findAll(): Promise<Product[]> {
    const data = await this.productModel.find();

    return data;
  }

  async findOneById(id: string): Promise<Product | null> {
    const data = await this.productModel.findById(id);

    return data;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const data = await this.productModel.findByIdAndUpdate(
      id,
      updateProductDto,
    );

    return data;
  }

  async remove(id: string): Promise<Product> {
    const data = await this.productModel.findByIdAndDelete(id);

    return data;
  }

  async findByName(name: string): Promise<Product | null> {
    const product = await this.productModel.findOne({ name });

    return product;
  }

  async findBySlug(slug: string): Promise<Product | null> {
    const product = await this.productModel.findOne({ slug });

    return product;
  }
}
