import { CreateTokenDto } from '../../auth/dto/create.token.dto';
import { Token } from '../../auth/interfaces/token.interface';

export interface AuthApiClient {
  createToken(createToken: CreateTokenDto): Promise<Token>;
  loginAs(createToken: CreateTokenDto): Promise<this>;
}
