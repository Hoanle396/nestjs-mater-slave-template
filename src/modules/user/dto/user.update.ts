import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';
import { Lowercase } from 'src/common/decorators/lowercase.decorator';

export class UpdateUserInfoDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  @Lowercase()
  @MaxLength(100)
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  fullName?: string;
}
