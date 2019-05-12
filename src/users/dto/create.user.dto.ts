import { IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiModelProperty()
  @IsEmail()
  readonly email: string;
}
