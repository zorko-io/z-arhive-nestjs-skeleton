import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  create(user: User): string {
    this.users.push(user);
    return String(this.users.length - 1);
  }

  update(userUpdates: User): User {
    const prevUser = this.findOne(userUpdates.id);
    const user = {
      ...prevUser,
      userUpdates
    };
    this.users[user.id] = user;
    return user
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string) {
    return this.users[id];
  }

  findOneByEmail(email: string) {
    return this.users.find(user => user.email === email);
  }
}
