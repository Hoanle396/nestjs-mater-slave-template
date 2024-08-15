import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCatDto } from './create-cat.dto';

export class UpdateCatDto extends PartialType(CreateCatDto) {
  @ApiProperty({
    description: 'The name of the cat',
    example: 'Whiskers',
  })
  id: number;
}
