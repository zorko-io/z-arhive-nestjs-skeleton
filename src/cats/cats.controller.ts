import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateCatDto } from '../dto/create.cat.dto';
import { ListCatsQuery } from '../dto/list.cats.query';
import { UpdateCatDto } from '../dto/update.cat.dto';

@Controller('cats')
export class CatsController {
  @Post()
  create(@Body() createCatDto: CreateCatDto): string {
    return `This action adds a new cat, from #${JSON.stringify(createCatDto)}`;
  }

  @Get()
  findAll(@Query() query: ListCatsQuery): string {
    return `This action returns all cats(limit: ${query.limit})`;
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
