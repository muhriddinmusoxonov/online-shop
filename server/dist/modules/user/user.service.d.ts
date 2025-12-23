import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOneById(id: string): Promise<User | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findByPhone(phone: number): Promise<User | null>;
}
