import * as Api from '../src/client';
import * as fs from 'fs';
import * as path from 'path';

async function loadInitialData() {

  Api.setConfig({baseURL: 'http://localhost:3000'});

  try {
    const deleteCount = await Api.Users.removeUsers();

    // tslint:disable-next-line:no-console
    console.log(`Cleaned up all users: #deleteCount: ${deleteCount}`);

    let initUsers: any = fs.readFileSync(
      path.join('seed', 'init.users.json'),
    );

    initUsers = JSON.parse(initUsers.toString());

    // tslint:disable-next-line:no-console
    console.log('INIT_USERS', initUsers);

    const result = await Promise.all([
      Api.User.createUser(initUsers[0]),
      Api.User.createUser(initUsers[1])
    ]);

    // tslint:disable-next-line:no-console
    console.log(`Create initial users #ids: ${result}`);
  } catch (error) {
    if (error.response) {
      // tslint:disable-next-line:no-console
      console.error('Loading was failed', {
        statusCode: error.response.data.statusCode,
        message: error.response.data.message
      });
    }
  }
}

loadInitialData();
