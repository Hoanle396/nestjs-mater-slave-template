import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { CommonQuery } from 'src/shared/dto/common.query';
import { RoleEnum } from 'src/shared/enums';

export class QueryAdminDto extends CommonQuery {
  @ApiProperty({ type: 'enum', enum: RoleEnum, required: false })
  @IsOptional()
  @IsEnum(RoleEnum)
  role?: RoleEnum;

  @ApiProperty({ type: Boolean, required: false })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  isActive?: boolean;
}
