import { AuthHeader, request } from './request';
import { Server, Users } from './test.configs';
import * as faker from 'faker';

describe('Users', () => {
  let user;

  beforeAll(() => {
     user = {
       email: faker.internet.email(),
       password: faker.internet.password()
     }
  });

  it('/GET users', () => {
    return request
      .get('/users')
      .set(AuthHeader.Key, AuthHeader.Value)
      .expect(200)
      .then(res => {
        expect(res.body.length).toBeGreaterThan(0);
      })
  });

  it('/POST users create new user', () => {
    return request
      .post('/users')
      .set(AuthHeader.Key, AuthHeader.Value)
      .send(user)
      .expect(201)
      .then(res => {
        expect(res.text.length).toBeGreaterThan(0);
        user.id = res.text;
      })
  });
});
