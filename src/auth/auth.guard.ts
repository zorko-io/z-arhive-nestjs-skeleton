import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '../config/config.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // TODO: find on how to inject service to guard
  // @Inject()
  // private readonly config: ConfigService;

  canActivate(context: ExecutionContext) {
    const config = new ConfigService();

    if (config.isAuthEnabled) {
      return super.canActivate(context);
    }
    return true
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
