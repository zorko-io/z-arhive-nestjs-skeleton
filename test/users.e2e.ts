// import { AuthHeader, request } from './request';
import { Users } from './test.configs';
import * as faker from 'faker';
import _ = require('lodash');

xdescribe('Users', () => {
  let user;

  // beforeAll(() => {
  //    user = {
  //      email: faker.internet.email(),
  //      password: faker.internet.password()
  //    }
  // });

  // it('/GET users', () => {
  //   return request
  //     .get('/users')
  //     .set(AuthHeader.Key, AuthHeader.Value)
  //     .expect(200)
  //     .then(res => {
  //       expect(res.body.length).toBeGreaterThan(0);
  //     })
  // });

  // it('/POST users - create new user',  () => {
  //   return request
  //     .post('/users')
  //     .set(AuthHeader.Key, AuthHeader.Value)
  //     .send(user)
  //     .expect(201)
  //     .then(res => {
  //       expect(res.text.length).toBeGreaterThan(0);
  //       user.id = res.text;
  //     })
  // });

  // it('/GET users - read user by id', () => {
  //   return request
  //     .get(`/users/${user.id}`)
  //     .set(AuthHeader.Key, AuthHeader.Value)
  //     .expect(200)
  //     .then(res => {
  //       expect(res.body.email).toEqual(user.email);
  //       expect(res.body.id).toEqual(user.id);
  //       expect(res.body.password).not.toBeDefined();
  //     })
  // });

  // it('/DELETE users - delete user by id', async () => {
  //   return  request
  //     .delete(`/users/${user.id}`)
  //     .set(AuthHeader.Key, AuthHeader.Value)
  //     .expect(200)
  //     .then(res => {
  //
  //       expect(_.isEmpty(res.body)).toBeTruthy();
  //
  //       return request
  //         .get(`/users/${user.id}`)
  //         .set(AuthHeader.Key, AuthHeader.Value)
  //         .expect(404)
  //         .catch( err => {
  //           expect(err).toBeDefined();
  //         });
  //     });
  // });
});
