import * as User from './user'
import * as Users from './users'
import axios from 'axios';

function setConfig(config: { baseURL?: string }) {
  if (config.baseURL) {
    axios.defaults.baseURL = config.baseURL
  }
}

export {
  User,
  Users,
  setConfig
}

