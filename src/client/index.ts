import * as Auth from './auth'
import * as User from './user'
import * as Users from './users'
import axios from 'axios';

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

export {
  Auth,
  User,
  Users,
  setConfig,
  resetAuthorization
}

