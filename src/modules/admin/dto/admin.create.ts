import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Lowercase } from 'src/common/decorators/lowercase.decorator';
import { RoleEnum } from 'src/shared/enums';

export class CreateAdminDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail()
  @Lowercase()
  @MaxLength(100)
  email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  fullName: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ type: 'enum', enum: RoleEnum, required: true })
  @IsNotEmpty()
  @IsEnum(RoleEnum)
  role: RoleEnum;

  @ApiProperty({ type: Boolean, required: false })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  isActive?: boolean;
}
