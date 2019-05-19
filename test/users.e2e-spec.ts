import * as request from 'supertest';
import { Server, Users } from './test.configs';

describe('Users', () => {
  let token;
  beforeAll(() => {
    return request(Server.baseUrl)
              .post('/auth/token')
              .send(Users.JoeUser)
              .then(res => {
                 token = res.body;
              })
  });

  it('/GET users', () => {
    return request(Server.baseUrl)
      .get('/users')
      .set('Authorization', `Bearer ${token.accessKey}`)
      .expect(200)
      .then(res => {
        expect(res.body.length).toBeGreaterThan(0);
      })
  });
});
