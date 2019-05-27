import { Server, Users } from './test.configs';
import * as Api from '../src/client';

describe('Auth', () => {

  beforeAll(async () => {
    Api.setConfig({baseURL: Server.baseUrl})
  });

  it('creates token', async () => {
    let token = await Api.Auth.createToken(Users.JoeUser);

    expect(token.accessKey.length).toBeGreaterThan(0);
    expect(token.userId.length).toBeGreaterThan(0);

    token = await Api.Auth.createToken(Users.AdminUser);

    expect(token.accessKey.length).toBeGreaterThan(0);
    expect(token.userId.length).toBeGreaterThan(0);
  });

  it('fails login', async () => {
    expect.assertions(1);
    const noneUser = {email: 'nosuch@user.com', password: '1dsa12313'};

    try {
      await Api.Auth.createToken(noneUser);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

});
