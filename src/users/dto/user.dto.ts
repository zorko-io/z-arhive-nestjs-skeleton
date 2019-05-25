import { ApiModelProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';
import { RolesEnum } from '../../roles/roles.enum';

export class UserDto {
  @ApiModelProperty()
  @IsString()
  id: string;

  @ApiModelProperty()
  @IsEmail()
  email: string;

  @Exclude()
  password: string;

  @ApiModelProperty()
  @IsArray()
  roles: RolesEnum[];

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}
