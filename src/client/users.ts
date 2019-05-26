import { User } from '../users/interfaces/user.interface';

export async function createUsers(users: User[]): Promise<string[]> {
  return ['1', '2', '3'];
}

export async function removeUsers(users: User[] = []): Promise<number> {
  return 4;
}

