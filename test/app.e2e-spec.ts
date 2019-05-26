import * as request from 'supertest';
import { AuthHeader } from './request';
import { Server } from './test.configs';
import { bootstrap } from '../src/app';

describe('AppController (e2e)', () => {
  let app;

  beforeAll(async () => {
    process.env.API_AUTH_ENABLED = 'false';

    app = await bootstrap();

    return app;
  });

  it('/GET users', () => {
    return request(Server.baseUrl)
      .get('/users')
      .set(AuthHeader.Key, AuthHeader.Value)
      .expect(200)
      .then(res => {
        expect(res.body.length).toBeGreaterThan(0);
      })
  });

  afterAll(async () => {
    return app.close();
  })
});
