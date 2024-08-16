import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Lowercase } from 'src/common/decorators/lowercase.decorator';

export class ValidateUserByPasswordDto {
  @ApiProperty({ required: true, example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  @Lowercase()
  email: string;

  @ApiProperty({ required: true, example: '123456' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
