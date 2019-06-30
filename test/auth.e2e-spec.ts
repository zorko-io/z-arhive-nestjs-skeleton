import { Server, Users } from './setup.e2e.config';
import { AuthApiClient } from '../src/client';
import axios from 'axios';

describe('Auth', () => {
  let auth;

  beforeAll(async () => {
    auth = new AuthApiClient(axios.create({
      baseURL: Server.baseUrl,
    }));
  });

  it('creates token', async () => {
    let token = await auth.createToken(Users.JoeUser);

    expect(token.accessKey.length).toBeGreaterThan(0);
    expect(token.userId.length).toBeGreaterThan(0);

    token = await auth.createToken(Users.AdminUser);

    expect(token.accessKey.length).toBeGreaterThan(0);
    expect(token.userId.length).toBeGreaterThan(0);
  });

  it('fails login', async () => {
    expect.assertions(1);
    const noneUser = {email: 'nosuch@user.com', password: '1dsa12313'};

    try {
      await auth.createToken(noneUser);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
