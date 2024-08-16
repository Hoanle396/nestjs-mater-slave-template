import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { IsDate } from 'src/common/decorators/is_date.decorator';
import { SortEnum } from '../enums';

export class CommonQuery {
  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  @IsDate()
  fromDate?: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  @IsDate()
  toDate?: string;

  @ApiProperty({ required: false, type: 'enum', enum: SortEnum })
  @IsOptional()
  @IsEnum(SortEnum)
  sort?: SortEnum = SortEnum.DESC;
}
