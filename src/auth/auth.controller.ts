import { Body, Controller, ForbiddenException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateTokenDto } from './dto/create.token.dto';
import { Token } from './interfaces/token.interface';
import { ApiUseTags } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UsersService) {}

  @Post('token')
  async createToken(@Body() tokenPayloadDto: CreateTokenDto): Promise<Token> {
    const accessKey = await this.authService.createTokenKey(tokenPayloadDto);
    if (!accessKey) {
       throw new ForbiddenException('Access Denied.')
    }
    const user = await this.userService.findOneByEmail(tokenPayloadDto.email);
    return {
       accessKey,
       userId: user.id
     };
  }
}
