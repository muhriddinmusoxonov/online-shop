import { CategoryService } from './category.service';
import CreateCategoryDto from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ResData } from 'src/lib/resData';
import { Category } from './schema/category.schema';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(createCategoryDto: CreateCategoryDto): Promise<ResData<Category>>;
    findAll(): Promise<ResData<Category[]>>;
    findOne(id: string): Promise<ResData<Category>>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<ResData<Category>>;
    remove(id: string): Promise<ResData<Category>>;
}
