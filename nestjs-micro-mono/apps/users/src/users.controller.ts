import { Controller, NotFoundException } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserService } from './users.service';
import { CreateUserRequest, Empty, UpdateUserRequest, UserLoginResponse, UserRequest, UserRequestByEmail, UserResponse } from 'libs/generated/user';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'GetUser')
async getUser(data: UserRequest): Promise<UserResponse >  {

  const user = await this.userService.getUser(data) ;
  if(!user) throw new NotFoundException('user not found')
    return user;
}

@GrpcMethod('UserService', 'CreateUser')
createUser(data:CreateUserRequest) {
  return this.userService.createUser(data);
}

@GrpcMethod('UserService', 'UpdateUser')
updateUser(data:UpdateUserRequest) {
  return this.userService.updateUser(data);
}

@GrpcMethod('UserService', 'DeleteUser')
deleteUser(data:UserRequest):Empty {
  return this.userService.deleteUser(data.id);
}

@GrpcMethod('UserService' , 'GetUserByEmail')
getUserByEmail(data : UserRequestByEmail):Promise<UserLoginResponse> {
  return this.userService.getUserByEmail(data)
}




}
