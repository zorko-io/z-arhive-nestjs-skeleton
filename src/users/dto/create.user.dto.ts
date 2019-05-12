import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiModelProperty()
  @IsEmail()
  readonly email: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
