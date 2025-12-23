import CreateCategoryDto from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './schema/category.schema';
import { Model } from 'mongoose';
export declare class CategoryService {
    private categoryModul;
    constructor(categoryModul: Model<Category>);
    create(createCategoryDto: CreateCategoryDto): Promise<Category>;
    findAll(): Promise<Category[]>;
    findOneId(id: string): Promise<Category | null>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category>;
    remove(id: string): Promise<Category>;
    findByName(name: string): Promise<Category | null>;
}
