import {Model} from 'mongoose'
import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable()
export class UsersService {
  private readonly users: User[] = [{email: 'test@email.com', id: '0'}];

  constructor(@InjectModel('User') private readonly userModel: Model) {}

  async create(user: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(user);
    const result = await createdUser.save();
    return {
      id: result._id.toString(),
      email: result.email
    };
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
