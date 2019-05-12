import { Model } from 'mongoose';
import { ConflictException, Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create.user.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<UserEntity>) {}

  async create(user: CreateUserDto): Promise<User> {
    const existingUser = await this.findOneByEmail(user.email);
    if (existingUser) {
      throw new ConflictException('User already exists')
    }
    const hashPassword = await bcrypt.hash(user.password, 10);
    const createdUser = new this.userModel({
      ...user,
      password: hashPassword
    });
    const result = await createdUser.save();
    return result.toUser();
  }

  async update(userUpdates: User): Promise<User> {
    const prevUser = this.findOne(userUpdates.id);
    return {
      ...prevUser,
      userUpdates
    }
  }

  async findAll(): Promise<User[]> {
    const models = await this.userModel.find();
    return models.map(model => model.toUser());
  }

  async findOne(id: string): Promise<User> {
    const userModel = await this.userModel.findOne(id);
    return userModel.toUser()
  }

  async findOneByEmail(email: string): Promise<User> {
    const userModel = await this.userModel.findOne({
      email
    });
    return userModel.toUser();
  }
}
