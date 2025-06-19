import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { UserController } from './user.controller';
import { TodoController } from './todo.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'user',
          protoPath: join(__dirname, '../../proto/user.proto'),
          url: 'localhost:5000',
        },
      },
      {
        name: 'TODO_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'todo',
          protoPath: join(__dirname, '../../proto/todo.proto'),
          url: 'localhost:5001',
        },
      },
    ]),
  ],
  controllers: [UserController, TodoController],
})
export class AppModule {}
