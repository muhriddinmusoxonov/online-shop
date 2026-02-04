import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  UserIsAlreadyExist,
  UserIsNotFound,
} from './excpetionErrors/userExceptionErrors';
import { ResData } from 'src/lib/resData';
import { User } from './schema/user.schema';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { RolesGuard } from 'src/Guards/roles.guard';
import { JwtAuthGuard } from 'src/Guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/middleware/roles.decorator';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.findByEmail(createUserDto.email);

    if (user !== null) throw new UserIsAlreadyExist();

    const byPhone = await this.userService.findByPhone(createUserDto.phone);
    if (byPhone !== null) throw new UserIsAlreadyExist();

    const hashPass = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashPass;

    const data = await this.userService.create(createUserDto);

    return new ResData<User>(201, 'created', data);
  }

  @Get('all')
  @UseGuards(AuthGuard('jwt'), RolesGuard, JwtAuthGuard)
  @Roles('admin')
  async findAll() {
    const data = await this.userService.findAll();

    return new ResData<User[]>(200, 'success', data);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  async findOne(@Req() req) {
    const id = req.user.userId;

    const user = await this.userService.findOneById(id);

    if (user === null) throw new UserIsNotFound();

    return new ResData<User>(200, 'success', user);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseObjectIdPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.userService.findOneById(id);
    if (user === null) throw new UserIsNotFound();

    if (updateUserDto.email) {
      const data = await this.userService.findByEmail(updateUserDto.email);

      if (data !== null && String(data._id) !== String(user._id)) {
        throw new UserIsAlreadyExist();
      }
    }

    if (updateUserDto.phone) {
      const data = await this.userService.findByPhone(updateUserDto.phone);
      if (data !== null && String(data._id) !== String(user._id)) {
        throw new UserIsAlreadyExist();
      }
    }

    if (updateUserDto.password) {
      const hashPass = await bcrypt.hash(updateUserDto.password, 10);
      updateUserDto.password = hashPass;
    }

    const data = await this.userService.update(id, updateUserDto);

    return new ResData<User>(200, 'success', data);
  }

  @Delete(':id')
  async remove(@Param('id', new ParseObjectIdPipe()) id: string) {
    await this.findOne(id);

    const data = await this.userService.remove(id);

    return new ResData<User>(200, 'success', data);
  }
}
