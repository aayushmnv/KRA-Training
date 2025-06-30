// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CreateUserHandler } from './commands/create-user.handler';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserCreatedHandler } from './events/userCreatedEventHandler';
import { UsersSagas } from './saga/user,saga';

const CommandHandlers = [CreateUserHandler];
const EventHandlers = [UserCreatedHandler];

@Module({
  imports: [CqrsModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    ...CommandHandlers,
    ...EventHandlers,
    UsersSagas,
  ],
})
export class UsersModule {}
