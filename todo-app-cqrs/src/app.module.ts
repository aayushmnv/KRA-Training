import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entity/task.entity';
import { TaskService } from './app.service';
import { TaskController } from './app.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateTaskHandler } from './command-handlers/create-task.handler';
import { UpdateTaskHandler } from './command-handlers/update-task.handler';
import { DeleteTaskHandler } from './command-handlers/delete-task.handler';
import { GetAllTasksHandler } from './query-handler/get-all-query.handler';
import { GetTaskByIdHandler } from './query-handler/get-taskById-query.handler';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Aayush1209',
      database: 'todo',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Task]),
     CqrsModule, 
  ],
  controllers: [TaskController],
  providers: [ TaskService,
    // command handlers
    CreateTaskHandler,
    UpdateTaskHandler,
    DeleteTaskHandler,
    // query handlers
    GetAllTasksHandler,
    GetTaskByIdHandler,],
})
export class AppModule {}
