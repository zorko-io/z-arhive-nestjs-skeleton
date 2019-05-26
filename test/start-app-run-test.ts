import { bootstrap } from '../src/app';
import * as request from 'supertest';

async function setup() {

  process.env.API_AUTH_ENABLED = 'false';

  const app = await bootstrap();

  await request('http:localhost:3000')
    .get('/users')
    .expect(200)
    .then(res => {
      expect(res.body.length).toBeGreaterThan(0);
    });

  await app.close();
}


setup();
