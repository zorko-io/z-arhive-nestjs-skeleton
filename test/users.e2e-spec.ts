import { Users } from './config';
import * as faker from 'faker';
import { RolesEnum } from '../src/roles/roles.enum';
import { ApiTestHelper } from './helper/api.test.helper';

describe('Users', () => {

  describe('Admin', () => {
    let user;
    let userId;
    let Api;

    beforeAll(async () => {
      Api = ApiTestHelper.create();
      Api = await Api.loginAs(Users.AdminUser);

      user = {
         email: faker.internet.email(),
         password: faker.internet.password()
      };
    });

    it('/GET users', async () => {
      const users = await Api.User.fetchUsers();

      expect(users && users.length > 0).toBeTruthy();
    });

    it('CRUD - user', async () => {
      // tslint:disable-next-line:no-console
      console.log('before create user');
      userId = await Api.User.createUser(user);
      expect(userId && userId.length > 0).toBeTruthy();

      const actualUser = await Api.User.fetchUserById(userId);
      expect(actualUser).toEqual({
        id: userId,
        email: user.email,
        roles: [RolesEnum.User]
      });
    });
  });

  // TODO: uncomment test cases and actually test them
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
