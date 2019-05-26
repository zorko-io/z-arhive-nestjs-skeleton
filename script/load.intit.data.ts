import * as Api from '../src/client';
import * as fs from 'fs';
import * as path from 'path';

async function loadInitialData() {

  Api.setConfig({ baseURL: 'http://localhost:3000' });

  try {
    const deleteCount = await Api.Users.removeUsers();

    // tslint:disable-next-line:no-console
    console.log(`Cleaned up all users: #deleteCount: ${deleteCount}`);

    let initUsers: any = fs.readFileSync(
      path.join('seed', 'init.users.json'),
    );

    initUsers = JSON.parse(initUsers.toString());

    // tslint:disable-next-line:no-console
    console.log(`Let's create few users: #newUsersCount ${initUsers.length}`);

    const result = await Promise.all(
      initUsers.map(user => Api.User.createUser(user))
    );

    // tslint:disable-next-line:no-console
    console.log(`Created initial users, #newUsersIds: ${result.join(',')}`);
  } catch (error) {
    if (error.response) {
      // tslint:disable-next-line:no-console
      console.error('Loading was failed', {
        statusCode: error.response.data.statusCode,
        message: error.response.data.message,
      });
    } else {
      // tslint:disable-next-line:no-console
      console.error('Loading was failed');
    }
  }
}

loadInitialData();

