import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { CreateTokenDto } from './dto/create.token.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../users/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) {}

  async createTokenKey(token: CreateTokenDto): Promise<string> {
    return this.jwtService.sign({
      user: {
        email: token.email,
        password: token.password
      },
      expiredIn: 3600
    });
  }

  async validateUser(payload: JwtPayload): Promise<User | null> {
    const user = await this.usersService.findOneByEmail(payload.user.email);

    let match;

    if (payload.user && payload.user.password) {
     match = await bcrypt.compare(payload.user.password, user.password);
    }

    return match ? user : null;
  }
}
