import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { Lowercase } from 'src/common/decorators/lowercase.decorator';

export class EmailDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @Lowercase()
  @MaxLength(100)
  email: string;
}
