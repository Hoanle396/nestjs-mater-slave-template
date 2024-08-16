import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Lowercase } from 'src/common/decorators/lowercase.decorator';

export class CreateUserByPasswordDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @MaxLength(100)
  fullName: string;

  @ApiProperty({ required: true, example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  @Lowercase()
  @MaxLength(100)
  email: string;

  @ApiProperty({ required: true, example: '123456' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
