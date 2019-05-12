import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { ListUserQuery } from './dto/list.user.query';
import { UpdateUserDto } from './dto/update.user.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiUseTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiUseTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({title: 'Create user'})
  @UseGuards(AuthGuard())
  async create(@Body() createCatDto: CreateUserDto): Promise<string> {
    const user = await this.usersService.create(createCatDto);
    return user.id;
  }

  @Get()
  @UseGuards(AuthGuard())
  async findAll(@Query() query: ListUserQuery): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  findOne(@Param('id') id): string {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  update(@Param('id') id: string, @Body() updateCatDto: UpdateUserDto): string {
    return `This action update #${id} user`;
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string) {
    return `This action removes a @${id} user`;
  }
}
