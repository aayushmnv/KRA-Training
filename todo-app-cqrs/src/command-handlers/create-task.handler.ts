import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskCommand } from 'src/commands/create-task.command';
import { Task } from 'src/entity/task.entity';
import { Repository } from 'typeorm';


@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ) {}

  async execute(command: CreateTaskCommand) {
    const task = this.taskRepo.create({ title: command.title });
    return await this.taskRepo.save(task);
  }
}
