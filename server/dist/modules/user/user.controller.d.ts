import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResData } from 'src/lib/resData';
import { User } from './schema/user.schema';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<ResData<User>>;
    findAll(): Promise<ResData<User[]>>;
    findOne(id: string): Promise<ResData<User>>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<ResData<User>>;
    remove(id: string): Promise<ResData<User>>;
}
