import { User } from '../users/interfaces/user.interface';
import axios, { AxiosResponse } from 'axios';
import { UserDto } from '../users/dto/user.dto';

export async function fetchUserById(userId: string): Promise<User> {
  const response: AxiosResponse<User> = await axios.get(`/users/${userId}`);
  return {
    ...response.data,
    password: ''
  };
}

export async function createUser(user: User): Promise<string> {
  const response: AxiosResponse<string> = await axios.post('/users', user);
  return response.data;
}
