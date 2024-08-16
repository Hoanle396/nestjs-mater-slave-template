import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Causes } from 'src/common/exceptions/causes';
import { Repository } from 'typeorm';

import type { CreateAdminDto } from './dto/admin.create';
import type { AdminProjectionDto } from './dto/admin.projection';
import type { QueryAdminDto } from './dto/admin.query';
import type { UpdateAdminDto } from './dto/admin.update';
import { Admin } from '@/databases/entities/admin.entity';
import { QueryPaginationDto } from '@/shared/dto/pagination.query';
import { FetchResult, FetchType, paginateEntities } from '@/utils/paginate';
import validateField from '@/utils/validate_field';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async getItemsByPagination(
    query?: QueryAdminDto,
    pagination?: QueryPaginationDto,
    projection?: AdminProjectionDto,
  ): Promise<FetchResult<Admin>> {
    try {
      // Projection
      const fields = validateField(
        projection as string,
        ['email', 'fullName', 'role', 'isActive'],
        'admin',
      );

      const { role, isActive, search, fromDate, toDate, sort } = query;
      const queryBuilder = this.adminRepository.createQueryBuilder('admin');

      if (fields?.length) {
        queryBuilder.select(fields);
      }

      // Query conditions mapping
      const conditions = [
        { condition: role, query: 'admin.role = :role', param: { role } },
        {
          condition: isActive !== undefined,
          query: 'admin.isActive = :isActive',
          param: { isActive },
        },
        {
          condition: search,
          query: '(admin.fullName LIKE :search OR admin.email LIKE :search)',
          param: { search: `%${search}%` },
        },
        {
          condition: fromDate,
          query: 'admin.createdAt >= :fromDate',
          param: { fromDate },
        },
        {
          condition: toDate,
          query: 'admin.createdAt <= :toDate',
          param: { toDate },
        },
      ];

      // Apply conditions
      conditions.forEach(({ condition, query, param }) => {
        if (condition) {
          queryBuilder.andWhere(query, param);
        }
      });

      // Sorting
      if (sort) {
        queryBuilder.orderBy('admin.createdAt', sort);
      }

      // Paginate
      return await paginateEntities<Admin>(
        queryBuilder,
        pagination,
        FetchType.MANAGED,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getItem(id: number, projection?: AdminProjectionDto): Promise<Admin> {
    try {
      // Projection
      const fields = validateField(
        projection as string,
        ['email', 'fullName', 'role', 'isActive'],
        'admin',
      );

      const queryBuilder = this.adminRepository
        .createQueryBuilder('admin')
        .where('admin.id = :id', { id });

      if (fields?.length) {
        queryBuilder.select(fields);
      }

      const adminExist = await queryBuilder.getOne();

      if (!adminExist) {
        throw Causes.NOT_FOUND('Admin');
      }

      return adminExist;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createItem(dto: CreateAdminDto): Promise<Admin> {
    const { email } = dto;

    const adminExist = await this.adminRepository.findOne({
      where: {
        email,
      },
      select: ['id'],
    });

    if (adminExist) {
      throw Causes.CONFLICT('Admin', 'Admin already exist');
    }

    return await this.adminRepository.save(dto);
  }

  async updateItem(id: number, dto: UpdateAdminDto): Promise<boolean> {
    const adminExist = await this.adminRepository.findOne({
      where: {
        id,
      },
      select: ['id'],
    });

    if (!adminExist) {
      throw Causes.NOT_FOUND('Admin');
    }

    const { affected } = await this.adminRepository.update(id, dto);
    return affected > 0;
  }

  async deleteItem(id: number): Promise<boolean> {
    const adminExist = await this.adminRepository.findOne({
      where: {
        id,
      },
      select: ['id'],
    });
    if (!adminExist) {
      throw Causes.NOT_FOUND('Admin');
    }

    const { affected } = await this.adminRepository.delete(id);
    return affected > 0;
  }
}
