import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomException } from 'src/common/exceptions/custom_exception';
import { User } from '@/databases/entities';
import { Repository } from 'typeorm';

import type { UpdateUserInfoDto } from './dto/user.update';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async updateUserInfo(
    user: User,
    dto: UpdateUserInfoDto,
  ): Promise<boolean | any> {
    const { email } = dto;

    if (email) {
      const isUniqueemail = await this.isUniqueField('email', email);
      if (!isUniqueemail && email !== user.email) {
        throw new CustomException(HttpStatus.CONFLICT, 'Email already exist', [
          'Email already exist',
        ]);
      }
    }

    const { affected } = await this.userRepository.update({ id: user.id }, dto);
    if (affected > 0) {
      const userRes = await this.userRepository.findOne({
        where: { id: user.id },
      });

      delete userRes.password;
      return {
        user: userRes,
      };
    }

    return false;
  }

  async deleteUser(user: User): Promise<boolean> {
    try {
      const { affected } = await this.userRepository.delete({ id: user.id });
      return affected > 0;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async isUniqueField(field: keyof User, value: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { [field]: value },
      select: ['id'],
    });
    return !user;
  }
}
