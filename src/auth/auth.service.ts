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
    const user = await this.validateUser({
         email: token.email,
         password: token.password,
    });

    if (user) {
      return this.jwtService.sign({
          email: token.email,
          password: token.password,
          roles: user.roles
      }, {expiresIn: 3600});
    } else {
      return ''
    }
  }

  async validateUser(payload: JwtPayload): Promise<User | null> {
    const user = await this.usersService.findOneByEmail(payload.email);

    let match;

    if (user && payload && payload.password) {
     match = await bcrypt.compare(payload.password, user.password);
    }

    return match ? user : null;
  }
}
