// src/users/users.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/createUserCommand';


@Controller('users')
export class UsersController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async createUser(@Body() body: any) {
    const { username, email, password } = body;
    await this.commandBus.execute(new CreateUserCommand(username, email, password));
    return { message: 'User creation initiated' };
  }
}
