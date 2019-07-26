import { AxiosInstance, AxiosResponse } from 'axios';
import { AuthApiClient } from './auth.api.client';
import { CreateTokenDto } from '../../auth/dto/create.token.dto';
import { Token } from '../../auth/interfaces/token.interface';

export class AuthAxiosApiClient implements AuthApiClient {
  protected readonly http: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.http = instance;
  }

  async createToken(createToken: CreateTokenDto): Promise<Token> {
    const response: AxiosResponse<Token> = await this.http.post('/auth/token', createToken);
    return response.data;
  }

  async loginAs(createToken: CreateTokenDto): Promise<this> {
    const token: Token = await this.createToken(createToken);
    return this.setAccessToken(token.accessKey);
  }

  private setAccessToken(token: string): this {
    this.http.defaults.headers.common.Authorization = `Bearer ${token}`;
    return this;
  }
}
