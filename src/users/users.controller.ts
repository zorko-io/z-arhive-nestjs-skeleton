import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { ListUserQuery } from './dto/list.user.query';
import { UpdateUserDto } from './dto/update.user.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createCatDto: CreateUserDto): string {
    return this.usersService.create(createCatDto);
  }

  @Get()
  async findAll(@Query() query: ListUserQuery): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id): string {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateUserDto): string {
    return `This action update #${id} user`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a @${id} user`;
  }
}