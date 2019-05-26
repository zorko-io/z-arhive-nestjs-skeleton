import * as Api from '../src/client';
import * as fs from 'fs';
import * as path from 'path';

async function loadInitialData() {

  const deleteCount = await Api.Users.removeUsers();

  // tslint:disable-next-line:no-console
  console.log(`Cleaned up all users: #deleteCount: ${deleteCount}`);

  let initUsers: any = fs.readFileSync(
    path.join('seed', 'init.users.json'),
  );

  initUsers = JSON.stringify(initUsers.toString());

  const result = await Promise.all([
    Api.User.createUser(initUsers[0]),
    Api.User.createUser(initUsers[1])
  ]);

  // tslint:disable-next-line:no-console
  console.log(`Create initial users: #usersCount: ${result}`);
}

loadInitialData();
