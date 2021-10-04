import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateCatDto {
  @IsString()
  @ApiProperty({
    type: [String],
    description: 'The name of a cat',
    default: 'Ivanov',
  })
  readonly name: string;

  @IsInt()
  @ApiProperty({
    description: 'The age of a cat',
    minimum: 1,
    default: 1,
  })
  readonly age: number;

  @IsString()
  @ApiProperty({
    type: [String],
    description: 'The breed of a cat',
    default: 'Maine Coon',
  })
  readonly breed: string;
}
