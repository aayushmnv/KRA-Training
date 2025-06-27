import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateTaskCommand } from 'src/commands/update-task.command';
import { Task } from 'src/entity/task.entity';
import { Repository } from 'typeorm';

@CommandHandler(UpdateTaskCommand)
export class UpdateTaskHandler implements ICommandHandler<UpdateTaskCommand> {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ) {}

  async execute(command: UpdateTaskCommand) {
    await this.taskRepo.update(command.id, command.data);
    return this.taskRepo.findOneBy({ id: command.id });
  }
}
