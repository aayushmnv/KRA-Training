import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteTaskCommand } from 'src/commands/delete-task.command';
import { Task } from 'src/entity/task.entity';
import { Repository } from 'typeorm';

@CommandHandler(DeleteTaskCommand)
export class DeleteTaskHandler implements ICommandHandler<DeleteTaskCommand> {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ) {}

  async execute(command: DeleteTaskCommand) {
    return await this.taskRepo.delete(command.id);
  }
}
