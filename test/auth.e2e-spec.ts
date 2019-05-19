import * as request from 'supertest';
import {Server, Users} from './test.configs'

describe('Auth', () => {

  it('/POST /auth/token passes login', () => {
    return request(Server.baseUrl)
      .post('/auth/token')
      .send(Users.JoeUser)
      .expect(201)
      .then(req => {
         expect(req.body.accessKey.length).toBeGreaterThan(0);
         expect(req.body.userId.length).toBeGreaterThan(0);
      })
  });

  it('/POST /auth/token fails login', done => {
    return request(Server.baseUrl)
      .post('/auth/token')
      .send({email: 'nosuch@user.com', password: '1dsa12313'})
      .expect(403)
      .end(err => {
        expect(err).toBeDefined();
        done();
      })
  });

});
