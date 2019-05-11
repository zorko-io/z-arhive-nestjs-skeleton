import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateTokenDto } from './dto/create.token.dto';
import { Token } from './interfaces/token.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('token')
  async createToken(@Body() tokenPayloadDto: CreateTokenDto): Promise<Token> {
    const accessKey = await this.authService.createTokenKey(tokenPayloadDto.email);
    return {
       accessKey
     };
  }
}
