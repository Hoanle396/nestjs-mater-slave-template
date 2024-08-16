import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { TokensType } from 'src/shared/types';
import { Repository } from 'typeorm';

import { UserService } from '../user/user.service';
import { AuthHelperService } from './auth_helper.service';
import type { ValidateUserByPasswordDto } from './dto/user.validate';
import type { CreateUserByPasswordDto } from './dto/user_basic.create';
import { HashService } from './hash.service';
import { CustomException } from '@/common/exceptions/custom_exception';
import { User } from '@/databases/entities';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashService: HashService,
    private readonly authHelperService: AuthHelperService,
    private readonly userService: UserService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(
    dto: CreateUserByPasswordDto,
  ): Promise<{ user: User | any; tokens: TokensType }> {
    const { fullName, email, password } = dto;

    const isUniqueEmail = await this.userService.isUniqueField('email', email);
    if (!isUniqueEmail)
      throw new CustomException(HttpStatus.CONFLICT, 'Email already exist', [
        'Email already exist',
      ]);

    const passwordHash = await this.hashService.hash(password);

    const user = await this.userRepository.save({
      fullName,
      email,
      password: passwordHash,
    });

    const tokens = await this.authHelperService.createTokensAsUser(user);

    delete user.password;

    return {
      user: {
        ...user,
        token: tokens.accessToken,
      },
      tokens,
    };
  }

  async validateUser(
    dto: ValidateUserByPasswordDto,
  ): Promise<{ user: User | any; tokens: TokensType }> {
    const { email, password } = dto;

    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new CustomException(
        HttpStatus.UNPROCESSABLE_ENTITY,
        'User not found',
        ['Invalid email'],
      );
    }

    if (!user.password)
      throw new CustomException(
        HttpStatus.BAD_REQUEST,
        'You have never registered a password before! Please request to reset your password!',
      );

    const isMatch = await this.hashService.compare(password, user.password);
    if (!isMatch) {
      throw new CustomException(HttpStatus.BAD_REQUEST, 'Wrong password!', [
        'Wrong password!',
      ]);
    }

    const tokens = await this.authHelperService.createTokensAsUser(user);

    delete user.password;

    return {
      user: {
        ...user,
        token: tokens.accessToken,
      },
      tokens,
    };
  }
}
