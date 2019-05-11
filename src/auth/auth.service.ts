import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) {}

  async createTokenKey(email: string): Promise<string> {
    if (!email) {
      throw new UnauthorizedException();
    }

    return this.jwtService.sign({
      user: {
        email
      },
      expiredIn: 3600
    });
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.usersService.findOneByEmail(payload.user.email);
  }
}
