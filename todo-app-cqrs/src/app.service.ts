import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { CreateTaskCommand } from './commands/create-task.command';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateTaskCommand } from './commands/update-task.command';
import { DeleteTaskCommand } from './commands/delete-task.command';
import { GetAllTasksQuery } from './queries/get-all-task.query';
import { GetTaskByIdQuery } from './queries/get-taskById.query';



@Injectable()
export class TaskService {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  create(dto: CreateTaskDto) {
    return this.commandBus.execute(new CreateTaskCommand(dto.title));
  }

  update(id: number, dto: UpdateTaskDto) {
    return this.commandBus.execute(new UpdateTaskCommand(id, dto));
  }

  delete(id: number) {
    return this.commandBus.execute(new DeleteTaskCommand(id));
  }

  findAll() {
    return this.queryBus.execute(new GetAllTasksQuery());
  }

  findOne(id: number) {
    return this.queryBus.execute(new GetTaskByIdQuery(id));
  }
}
