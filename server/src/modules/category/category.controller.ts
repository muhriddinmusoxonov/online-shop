import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import CreateCategoryDto from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  CategoryIsAlreadyExist,
  CategoryIsNotFound,
} from './categoryExceptionErrors/categoryExceptionError';
import { ResData } from 'src/lib/resData';
import { Category } from './schema/category.schema';
import { IsObjectIdPipe } from '@nestjs/mongoose';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create')
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryService.findByName(
      createCategoryDto.name,
    );
    if (category !== null) throw new CategoryIsAlreadyExist();

    const data = await this.categoryService.create(createCategoryDto);

    return new ResData<Category>(201, 'created', data);
  }

  @Get()
  async findAll() {
    const data = await this.categoryService.findAll();

    return new ResData<Category[]>(200, 'success', data);
  }

  @Get(':id')
  async findOne(@Param('id', new IsObjectIdPipe()) id: string) {
    const data = await this.categoryService.findOneId(id);
    if (data === null) throw new CategoryIsNotFound();

    return new ResData<Category>(200, 'success', data);
  }

  @Put(':id')
  async update(
    @Param('id', new IsObjectIdPipe()) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    await this.findOne(id);

    if (updateCategoryDto.name) {
      const category = await this.categoryService.findByName(
        updateCategoryDto.name,
      );
      if (category !== null && String(category._id) !== String(id))
        throw new CategoryIsAlreadyExist();
    }

    const data = await this.categoryService.update(id, updateCategoryDto);

    return new ResData<Category>(200, 'updated', data);
  }

  @Delete(':id')
  async remove(@Param('id', new IsObjectIdPipe()) id: string) {
    await this.findOne(id);

    const data = await this.categoryService.remove(id);

    return new ResData<Category>(200, 'success', data);
  }
}
