import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { RolesEnum } from './roles.enum';
import { RolesMetadataKey } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private  readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<RolesEnum[]>(RolesMetadataKey, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const hasRole = () => user.roles.some((role) => roles.includes(role));

    // TODO: relay on environment key her and check for empty users list

    return user && user.roles && hasRole();
  }

}
