import {
  Body, ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { ListUserQuery } from './dto/list.user.query';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiImplicitParam, ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { RolesEnum } from '../roles/roles.enum';
import { Roles } from '../roles/roles.decorator';

@ApiBearerAuth()
@ApiUseTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({title: 'Create user'})
  @UseGuards(AuthGuard())
  @Roles(RolesEnum.Admin)
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
  @UseGuards(AuthGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiImplicitParam({name: 'id', required: true})
  async findOne(@Param('id') id): Promise<UserDto> {
    const user = await this.usersService.findOneById(id);
    return new UserDto(user);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  async update(@Param('id') id: string, @Body() nextUser: UserDto): Promise<UserDto> {
    const user = await this.usersService.update(nextUser);
    return new UserDto(user)
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async remove(@Param('id') id: string): Promise<void> {
    await this.usersService.remove(id);
  }
}
