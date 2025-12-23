import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './schema/productSchema';
import { Model } from 'mongoose';
export declare class ProductService {
    private productModel;
    constructor(productModel: Model<Product>);
    create(createProductDto: CreateProductDto): Promise<Product>;
    findAll(): Promise<Product[]>;
    findOneById(id: string): Promise<Product | null>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<Product>;
    remove(id: string): Promise<Product>;
    findByName(name: string): Promise<Product | null>;
}
