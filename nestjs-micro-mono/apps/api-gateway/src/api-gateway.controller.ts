import { Controller, Get, Inject, OnModuleInit, Post, Query } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { join } from 'path';

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserService {
  getUser(data: { id: string }): Observable<User>;
}

@Controller()
export class AppController implements OnModuleInit {
  private userService: UserService;

  constructor(@Inject('USER_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<UserService>('UserService');
  }

  @Get('user')
  getUser(@Query('id') id: string) {
    return this.userService.getUser({ id });
  }

}