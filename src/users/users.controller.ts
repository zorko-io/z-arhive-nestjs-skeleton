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
import { ApiBearerAuth, ApiImplicitParam, ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { RolesEnum } from '../roles/roles.enum';
import { Roles } from '../roles/roles.decorator';
import { JwtAuthGuard } from '../auth/auth.guard';

@ApiBearerAuth()
@ApiUseTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({title: 'Create user'})
  @UseGuards(new JwtAuthGuard())
  @Roles(RolesEnum.Admin)
  async create(@Body() createCatDto: CreateUserDto): Promise<string> {
    const user = await this.usersService.create(createCatDto);
    return user.id;
  }

  @Get()
  // TODO: fix auth guard
  // @UseGuards(new JwtAuthGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll(@Query() query: ListUserQuery): Promise<UserDto[]> {
    const users = await this.usersService.findAll();
    return users.map(user => new UserDto(user));
  }

  @Get(':id')
  // TODO: fix auth guard
  // @UseGuards(new JwtAuthGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiImplicitParam({name: 'id', required: true})
  async findOne(@Param('id') id): Promise<UserDto> {
    const user = await this.usersService.findOneById(id);
    return new UserDto(user);
  }

  @Put(':id')
  // TODO: fix auth guard
  // @UseGuards(new JwtAuthGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  async update(@Param('id') id: string, @Body() nextUser: UserDto): Promise<UserDto> {
    const user = await this.usersService.update(nextUser);
    return new UserDto(user)
  }

  @Delete(':id')
  // TODO: fix auth guard
  // @UseGuards(new JwtAuthGuard())
  @ApiOperation({title: 'Remove user'})
  async remove(@Param('id') id: string): Promise<void> {
    await this.usersService.remove(id);
  }

  @Delete()
  // TODO: fix auth guard
  // @UseGuards(new JwtAuthGuard())
  @Roles(RolesEnum.Admin)
  @ApiOperation({title: 'Bulk remove users'})
  async bulkRemove(): Promise<number> {
    return await this.usersService.removeAll();
  }
}
