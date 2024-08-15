import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CatService } from './cat.service';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cat')
@ApiTags('cat')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return this.catService.create(createCatDto);
  }

  @Get()
  findAll() {
    return this.catService.findAll();
  }

  @Get('slave')
  findBySlave() {
    return this.catService.findBySlave();
  }
}
