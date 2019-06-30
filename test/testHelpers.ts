// import { Server, Users } from './setup.e2e.config';
// import { CreateTokenDto } from '../src/auth/dto/create.token.dto';
//
// async function doAuth(Api: any, token: CreateTokenDto) {
//   Api.setConfig({baseURL: Server.baseUrl});
//
//   const tokenResponse  = await Api.Auth.createToken(token);
//   Api.setConfig({token: tokenResponse.accessKey});
//
//   return Api;
// }
//
// export async function loginAsAdmin(Api: any) {
//   return await doAuth(Api, Users.AdminUser);
// }
//
// export async function loginAsUser(Api: any) {
//   return  await doAuth(Api, Users.JoeUser);
// }
