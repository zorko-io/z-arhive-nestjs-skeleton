import {
  Body, ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards, UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { ListUserQuery } from './dto/list.user.query';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiImplicitParam, ApiOperation, ApiUseTags } from '@nestjs/swagger';

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
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll(@Query() query: ListUserQuery): Promise<UserDto[]> {
    const users = await this.usersService.findAll();
    return users.map(user => new UserDto(user));
  }

  @Get(':id')
  @UseGuards(AuthGuard()) // TODO: restrict only for admin
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiImplicitParam({name: 'id', required: true})
  async findOne(@Param('id') id): Promise<UserDto> {
    const user = await this.usersService.findOne(id);
    return new UserDto(user);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  update(@Param('id') id: string, @Body() updateCatDto: UserDto): string {
    return `This action update #${id} user`;
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string) {
    // TODO: restrict only for admin
    return `This action removes a @${id} user`;
  }
}
