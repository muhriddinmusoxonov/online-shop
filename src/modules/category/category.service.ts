import { Injectable } from '@nestjs/common';
import CreateCategoryDto from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schema/category.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModul: Model<Category>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const data = await this.categoryModul.create(createCategoryDto);

    return data;
  }

  async findAll(): Promise<Category[]> {
    const data = await this.categoryModul.find();

    return data;
  }

  async findOneId(id: string): Promise<Category | null> {
    const data = await this.categoryModul.findById(id);

    return data;
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const data = await this.categoryModul.findByIdAndUpdate(
      id,
      updateCategoryDto,
    );

    return data;
  }

  async remove(id: string): Promise<Category> {
    const data = await this.categoryModul.findByIdAndDelete(id);

    return data;
  }

  async findByName(name: string): Promise<Category | null> {
    const data = await this.categoryModul.findOne({ name });

    return data;
  }
}
