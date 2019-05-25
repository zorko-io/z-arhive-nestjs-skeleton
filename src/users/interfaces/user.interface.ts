import { RolesEnum } from '../../roles/roles.enum';

export interface User {
  id: string;
  email: string;
  password: string;
  roles: RolesEnum[]
}
