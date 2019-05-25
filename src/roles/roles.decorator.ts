import { SetMetadata} from '@nestjs/common';
import { RolesEnum } from './roles.enum';

export const RolesMetadataKey = 'roles';

export const Roles = (...roles: RolesEnum[]) => SetMetadata(RolesMetadataKey, roles);
