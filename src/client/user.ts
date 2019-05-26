import { User } from '../users/interfaces/user.interface';
import axios, { AxiosResponse } from 'axios';

export async function createUser(user: User): Promise<string> {
  const response: AxiosResponse<string> = await axios.post('/users', user);
  return response.data;
}
