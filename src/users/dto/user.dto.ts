import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';

export class UserDto {
  @ApiModelProperty()
  @IsString()
  id: string;

  @ApiModelProperty()
  @IsEmail()
  email: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}
