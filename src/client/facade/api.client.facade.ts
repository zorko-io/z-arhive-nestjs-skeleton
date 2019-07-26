import { AuthApiClient } from '../auth/auth.api.client';
import { RemoteUserApiClient } from '../user/user.api.client';

export interface ApiClientFacade<C> extends AuthApiClient {
   Auth: AuthApiClient,
   User: RemoteUserApiClient,
   setConfig(C): this;
}
