import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { ValidateField } from 'src/common/decorators/validate_field.decorator';

export class AdminProjectionDto {
  @ApiProperty({
    required: false,
    type: String,
    example: '["email", "fullName", "role", "isActive"]',
  })
  @IsOptional()
  @IsString()
  @ValidateField(['email', 'fullName', 'role', 'isActive'])
  select?: string;
}
