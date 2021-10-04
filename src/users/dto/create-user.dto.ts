import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateUserDto {

  @IsString()
  @ApiProperty({
    type: [String],
    description: 'The username of a user',
    default: 'John Doe',
  })
  readonly username: string;

  @IsString()
  @ApiProperty({
    type: [String],
    description: 'The password of a user',
    default: 'Jane Doe',
  })
  readonly password: string;
}
