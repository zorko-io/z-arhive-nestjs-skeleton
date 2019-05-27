import { Token } from '../auth/interfaces/token.interface';
import axios, { AxiosResponse } from 'axios';

export async function createToken(params: {email: string, password: string}): Promise<Token> {
  const response: AxiosResponse<Token> = await axios.post('/auth/token', params);
  return response.data;
}
