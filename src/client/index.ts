import { AxiosApiClientFacade } from './facade/axios.api.client.facade';

export * from './auth'
export * from './user'

const Api = new AxiosApiClientFacade();

export default Api;
