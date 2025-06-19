import { Injectable, NotFoundException } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

interface CreateUserRequest {
  id: string;
  name: string;
  email: string;
}

interface GetUserByIdRequest {
  id: string;
}

interface UserResponse {
  id: string;
  name: string;
  email: string;
}

@Injectable()
export class UserService {
  private users: UserResponse[] = [];

  @GrpcMethod('UserService', 'CreateUser')
  CreateUser(data: CreateUserRequest): UserResponse {
    const user = { ...data };
    this.users.push(user);
    return user;
  }

 @GrpcMethod('UserService', 'GetUserById')
getUserById(data: GetUserByIdRequest): UserResponse {
  const user = this.users.find(user => user.id === data.id);
  if (!user) {
    throw new Error(`User with id ${data.id} not found`);
  }
  return user;
}

}
