import { ApiProperty } from '@nestjs/swagger';

export class CreateCatDto {
  @ApiProperty({
    description: 'The name of the cat',
    example: 'Whiskers',
  })
  name: string;

  @ApiProperty({
    description: 'The age of the cat',
    example: 3,
  })
  age: number;
}
