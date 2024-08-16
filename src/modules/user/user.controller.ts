import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { GetUser } from '@/common/decorators/user.decorator';
import { User } from '@/databases/entities';
import { UserJwtGuard } from '../auth/guards/user_jwt.guard';
import { UpdateUserInfoDto } from './dto/user.update';
import { UserService } from './user.service';

@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get user info' })
  @Get()
  @UseGuards(UserJwtGuard)
  async getMe(@GetUser() user: User): Promise<User> {
    return user;
  }

  @ApiOperation({ summary: 'Update user info' })
  @Put()
  @UseGuards(UserJwtGuard)
  async updateUserInfo(
    @GetUser('user') user: User,
    @Body() dto: UpdateUserInfoDto,
  ): Promise<boolean | any> {
    return await this.userService.updateUserInfo(user, dto);
  }

  @ApiOperation({ summary: 'Delete user' })
  @Delete()
  @HttpCode(204)
  @UseGuards(UserJwtGuard)
  async deleteUser(@GetUser('user') user: User): Promise<boolean> {
    return await this.userService.deleteUser(user);
  }
}
