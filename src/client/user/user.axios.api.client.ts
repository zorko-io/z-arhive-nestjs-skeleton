import { User } from '../../users/interfaces/user.interface';
import { UserDto } from '../../users/dto/user.dto';
import { AxiosResponse } from 'axios';
import { RemoteUserApiClient } from './remote.user.api.client';
import { AuthAxiosApiClient } from '../auth';

export class UserAxiosApiClient extends AuthAxiosApiClient implements RemoteUserApiClient  {

  async fetchUsers(): Promise<User[]> {
    const response: AxiosResponse<User[]> = await this.http.get('/users');
    return response.data
  }

  async createUser(user: UserDto): Promise<string> {
    const response: AxiosResponse<string> = await this.http.post('/users', user);
    return response.data;
  }

  async fetchUserById(userId: string): Promise<User> {
    const response: AxiosResponse<User> = await this.http.get(`/users/${userId}`);
    return response.data;
  }

  async createUsers(users: User[]): Promise<string[]> {
    return ['1', '2', '3'];
  }

  async removeUsers(users: User[] = []): Promise<number> {
    const response: AxiosResponse<number> = await this.http.delete('/users');
    return response.data
  }
}

