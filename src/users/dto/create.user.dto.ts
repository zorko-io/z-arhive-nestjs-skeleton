import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { RolesEnum } from '../../roles/roles.enum';

export class CreateUserDto {
  @ApiModelProperty()
  @IsEmail()
  readonly email: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiModelProperty()
  @IsArray()
  readonly roles: RolesEnum[];
}
