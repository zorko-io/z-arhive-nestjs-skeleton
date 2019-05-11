import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  create(user: User): string {
    this.users.push(user);
    return String(this.users.length - 1);
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string) {
    return this.users[id];
  }
}
