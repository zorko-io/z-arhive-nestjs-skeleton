import * as Auth from './auth'
// import * as User from './user'
import { User } from '../users/interfaces/user.interface';
// import * as Users from './users'
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Token } from '../auth/interfaces/token.interface';
import { CreateTokenDto } from '../auth/dto/create.token.dto';
import { Server } from '../../test/setup.e2e.config';
import { UserDto } from '../users/dto/user.dto';

function setConfig(config: { baseURL?: string, token?: string }) {
  const {baseURL, token} = config;
  if (baseURL) {
    axios.defaults.baseURL = baseURL;
  }
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer: ${token}`
  }
}

function resetAuthorization() {
  axios.defaults.headers.common.Authorization = '';
}

class AuthApiClient {
  private axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  async createToken(params: {email: string, password: string}): Promise<Token> {
    const response: AxiosResponse<Token> = await this.axiosInstance.post('/auth/token', params);
    return response.data;
  }
}


// tslint:disable-next-line:max-classes-per-file
class UserApiClient {
  private http: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.http = axiosInstance;
  }

  async fetchUsers(): Promise<User[]> {
    const response: AxiosResponse<User[]> = await this.http.get('/users');
    return response.data
  }

  async createUser(user: UserDto): Promise<string> {
    // tslint:disable-next-line:no-console
    console.log('create user');
    const response: AxiosResponse<string> = await this.http.post('/users', user);
    return response.data;
  }

  async fetchUserById(userId: string): Promise<User> {
    const response: AxiosResponse<User> = await this.http.get(`/users/${userId}`);
    return response.data;
  }
}


// tslint:disable-next-line:max-classes-per-file
export class ApiClient {
  private readonly axiosInstance: AxiosInstance;

  public User: UserApiClient;
  public Auth: AuthApiClient;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
    });

    this.axiosInstance.interceptors.response.use(response => response, error => {

      if (error.response) {
        if (error.response.status === 500) {
          // tslint:disable-next-line:no-console
          console.error(`Unexpected Error, #message: '${error.message}'`);
        } else if (error.response.status === 400) {
          // tslint:disable-next-line:no-console
          console.error(`Invalid Arguments, #message ${error.message}`);
        }
      }
      return error;
    });

    this.User = new UserApiClient(this.axiosInstance);
    this.Auth = new AuthApiClient(this.axiosInstance);
  }

  async loginAs(createToken: CreateTokenDto): Promise<ApiClient> {

    const token = await this.Auth.createToken(createToken);


    return this.setAccessToken(token.accessKey);
  }

  setAccessToken(token: string): ApiClient {
    this.axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    return this;
  }
}

export {
  Auth,
  User,
  // Users,
  setConfig,
  resetAuthorization
}


