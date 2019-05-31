// @ts-ignore
import initUsers from '../seed/init.users.json'
import * as Api from '../src/client';

const Server = {
  baseUrl: 'http://localhost:3000'
};

const Users  = {
  JoeUser : {
    email: 'test@email.com',
    password: '1234567',
    roles: ['user']
  },
  AdminUser : {
    email: 'admin@email.com',
    password: 'qwerty',
    roles: ['admin']
  }
};

const Tokens = {
  JoeUserToken: '',
  AdminUserToken: ''
};

beforeAll(async () => {
  Api.setConfig({baseURL: Server.baseUrl});

  let token  = await Api.Auth.createToken(Users.JoeUser);
  Tokens.JoeUserToken = token.accessKey;

  token  = await Api.Auth.createToken(Users.AdminUser);
  Tokens.AdminUserToken = token.accessKey;
});


export {Users, Server, Tokens}

