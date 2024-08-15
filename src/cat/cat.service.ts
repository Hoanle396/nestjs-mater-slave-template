import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async create(createCatDto: CreateCatDto) {
    const masterQueryRunner = this.dataSource.createQueryRunner();
    await masterQueryRunner.connect();
    await masterQueryRunner.startTransaction();
    try {
      const cat = new Cat();
      cat.name = createCatDto.name;
      cat.age = createCatDto.age;
      await masterQueryRunner.manager.save(cat);
      await masterQueryRunner.commitTransaction();
      return cat;
    } catch (error) {
      await masterQueryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await masterQueryRunner.release();
    }
  }

  async findAll() {
    const masterQueryRunner = this.dataSource.createQueryRunner('master');
    try {
      return await this.dataSource
        .createQueryBuilder(Cat, 'cat', masterQueryRunner)
        .setQueryRunner(masterQueryRunner)
        .getMany();
    } catch (error) {
      throw new InternalServerErrorException(error);
    } finally {
      await masterQueryRunner.release();
    }
  }

  async findBySlave() {
    const masterQueryRunner = this.dataSource.createQueryRunner('slave');
    try {
      return await this.dataSource
        .createQueryBuilder(Cat, 'cat', masterQueryRunner)
        .setQueryRunner(masterQueryRunner)
        .getMany();
    } catch (error) {
      throw new InternalServerErrorException(error);
    } finally {
      await masterQueryRunner.release();
    }
  }
}
