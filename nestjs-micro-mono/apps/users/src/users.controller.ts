import { Controller, NotFoundException } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { User } from './interfaces/user.interface';
import { UserService } from './users.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'GetUser')
async getUser(data: { id: string }): Promise< User>  {

  const user = await this.userService.getUser(data) ;
  if(!user) throw new NotFoundException('user not found')
    return user;
}

@GrpcMethod('UserService', 'CreateUser')
createUser(data: { name: string; email: string; password: string }) {
  return this.userService.createUser(data);
}

@GrpcMethod('UserService', 'UpdateUser')
updateUser(data: { id: string; name?: string; email?: string; password?: string }) {
  return this.userService.updateUser(data.id, data);
}

@GrpcMethod('UserService', 'DeleteUser')
deleteUser(data: { id: string }) {
  return this.userService.deleteUser(data.id);
}




}
