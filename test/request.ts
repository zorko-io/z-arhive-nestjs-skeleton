import * as request from 'supertest';
import { Server, Users } from './setup.e2e.config';

const agent = request.agent(Server.baseUrl);
const AuthHeader = {
  Key: 'Authorization',
  Value: ''
};

// @ts-ignore
agent.host(Server.baseUrl);

beforeAll(async () => {
   return agent
     .post('/auth/token')
     .send(Users.JoeUser)
     .then(res => {
       AuthHeader.Value  = `Bearer ${res.body.accessKey}`;
     })
});

export  {
  agent as request,
  AuthHeader
}

