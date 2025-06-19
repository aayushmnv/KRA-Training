import { Controller, Get, Post, Body, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateUserRequest, UserService } from './interfaces/user.interface';


@Controller('users')
export class UserController implements OnModuleInit {
  private userService: UserService;

  constructor(@Inject('USER_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<UserService>('UserService');
  }

  @Post()
  async CreateUser(@Body() body: CreateUserRequest) {
    return this.userService.CreateUser(body);
  }

  @Get()
  async getUserById(@Body('id') id: string) {
    return this.userService.getUserById({ id });
  }
}

