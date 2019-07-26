import { User } from '../../users/interfaces/user.interface';
import { UserDto } from '../../users/dto/user.dto';
import { AuthApiClient } from '../auth';

export interface RemoteUserApiClient extends AuthApiClient {
   fetchUsers(): Promise<User[]>;
   createUser(user: UserDto): Promise<string>;
   fetchUserById(userId: string): Promise<UserDto>;
   createUsers(users: User[]): Promise<string[]>;
   removeUsers(users?: User[]): Promise<number>
}
