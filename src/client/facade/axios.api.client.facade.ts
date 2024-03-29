import { AuthApiClient, AuthAxiosApiClient } from '../auth';
import { RemoteUserApiClient, UserAxiosApiClient } from '../user';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ApiClientFacade } from './api.client.facade';

export class AxiosApiClientFacade extends AuthAxiosApiClient implements ApiClientFacade<AxiosRequestConfig> {
  private readonly instance: AxiosInstance;
  public User: RemoteUserApiClient;
  public Auth: AuthApiClient;

  constructor(config?: AxiosRequestConfig) {
    const instance = axios.create(config);
    super(instance);
    this.instance = instance;

    this.User = new UserAxiosApiClient(this.instance);
    this.Auth = new AuthAxiosApiClient(this.instance);
  }

  setConfig(config: AxiosRequestConfig) {
    this.instance.defaults.baseURL  = config.baseURL;
    return this;
  }

  setResponseInterceptors(response, error) {
    this.instance.interceptors.response.use(response, error);
  }
}
