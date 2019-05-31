import { User } from '../users/interfaces/user.interface';
import axios, { AxiosResponse } from 'axios';

export async function createUsers(users: User[]): Promise<string[]> {
  return ['1', '2', '3'];
}

export async function removeUsers(users: User[] = []): Promise<number> {
  const response: AxiosResponse<number> = await axios.delete('/users');
  return response.data
}

export async function fetchUsers(): Promise<User[]> {
  const response: AxiosResponse<User[]> = await axios.get('/users');
  return response.data
}

