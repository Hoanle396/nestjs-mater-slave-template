import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/common/decorators/user.decorator';
import { RoleEnum, SwaggerOperationEnum } from 'src/shared/enums';

import { AdminJwtGuard } from '../auth/guards/admin_jwt.guard';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/admin.create';
import { AdminProjectionDto } from './dto/admin.projection';
import { QueryAdminDto } from './dto/admin.query';
import { UpdateAdminDto } from './dto/admin.update';
import { Roles } from '@/common/decorators/roles.decorator';
import { Admin } from '@/databases/entities/admin.entity';
import { FetchResult } from '@/utils/paginate';
import { QueryPaginationDto } from '@/shared/dto/pagination.query';

@ApiTags('admin')
@ApiBearerAuth()
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: SwaggerOperationEnum.ADMIN })
  @Get('me')
  @UseGuards(AdminJwtGuard)
  async getMe(@GetUser() admin: Admin): Promise<Admin> {
    return admin;
  }

  @ApiOperation({ summary: SwaggerOperationEnum.SUPER_ADMIN })
  @Get('list-roles')
  @Roles(RoleEnum.SUPER_ADMIN)
  async getListRoles(): Promise<RoleEnum[]> {
    return Object.values(RoleEnum);
  }

  @ApiOperation({ summary: SwaggerOperationEnum.ADMIN })
  @Get(':id')
  @UseGuards(AdminJwtGuard)
  async getItem(
    @Param('id') id: number,
    @Query('select') projection?: AdminProjectionDto,
  ): Promise<Admin> {
    return await this.adminService.getItem(id, projection);
  }

  @ApiOperation({ summary: SwaggerOperationEnum.ADMIN })
  @Get('')
  @UseGuards(AdminJwtGuard)
  async getItemsByPagination(
    @Query() query?: QueryAdminDto,
    @Query() pagination?: QueryPaginationDto,
    @Query('select') projection?: AdminProjectionDto,
  ): Promise<FetchResult<Admin>> {
    return await this.adminService.getItemsByPagination(
      query,
      pagination,
      projection,
    );
  }

  @ApiOperation({ summary: SwaggerOperationEnum.SUPER_ADMIN })
  @Post()
  @Roles(RoleEnum.SUPER_ADMIN)
  async createItem(@Body() dto: CreateAdminDto) {
    return await this.adminService.createItem(dto);
  }

  @ApiOperation({ summary: SwaggerOperationEnum.SUPER_ADMIN })
  @Patch(':id')
  @Roles(RoleEnum.SUPER_ADMIN)
  async updateItem(@Param('id') id: number, @Body() dto: UpdateAdminDto) {
    return await this.adminService.updateItem(id, dto);
  }

  @ApiOperation({ summary: SwaggerOperationEnum.SUPER_ADMIN })
  @Delete(':id')
  @Roles(RoleEnum.SUPER_ADMIN)
  async deleteItem(@Param('id') id: number) {
    return await this.adminService.deleteItem(id);
  }
}
