import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CategoryService } from '../category/category.service';
import { ResData } from 'src/lib/resData';
import { Product } from './schema/productSchema';
import { UserService } from '../user/user.service';
export declare class ProductController {
    private readonly productService;
    private readonly categoryService;
    private readonly userService;
    constructor(productService: ProductService, categoryService: CategoryService, userService: UserService);
    create(createProductDto: CreateProductDto): Promise<ResData<Product>>;
    findAll(): Promise<ResData<Product[]>>;
    findOne(id: string): Promise<ResData<Product>>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<ResData<Product>>;
    remove(id: string): Promise<ResData<Product>>;
}
