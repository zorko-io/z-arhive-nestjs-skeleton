import * as request from 'supertest';

describe('Auth', () => {

  it('passes login', done => {
    return request('http://localhost:3000')
      .post('/auth/token')
      .send({email: 'test@email.com', password: '1234567'})
      .expect(201)
      .end((err, req) => {
         if (err) {
           done(err)
         }
         expect(req.body.accessKey.length).toBeGreaterThan(0);
         expect(req.body.userId.length).toBeGreaterThan(0);
         done();
      })
  });

  it('fails login', done => {
    return request('http://localhost:3000')
      .post('/auth/token')
      .send({email: 'nosuch@user.com', password: '1dsa12313'})
      .expect(403)
      .end(err => {
        expect(err).toBeDefined();
        done();
      })
  });

});
