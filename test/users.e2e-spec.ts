// import { AuthHeader, request } from './request';
import { Users, Tokens } from './setup.e2e.config';
import * as faker from 'faker';
import * as _ from 'lodash';
import * as Api from '../src/client'

describe('Users', () => {
  describe('Admin', () => {
    it('/GET users', async () => {
      Api.setConfig({token: Tokens.AdminUserToken});

      const users = await Api.Users.fetchUsers();

      expect(users.length > 0);
    });
  });



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
