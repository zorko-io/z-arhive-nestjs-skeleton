import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateCatDto } from '../dto/create.cat.dto';
import { ListCatsQuery } from '../dto/list.cats.query';
import { UpdateCatDto } from '../dto/update.cat.dto';
import { CatsService } from './cats.service';
import { Cat } from '../interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private  readonly catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto): string {
    return this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(@Query() query: ListCatsQuery): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id): string {
    return `This action returns #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto): string {
    return `This action update #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a @${id} cat`;
  }
}
