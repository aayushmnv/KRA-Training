import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/entity/task.entity';
import { GetAllTasksQuery } from 'src/queries/get-all-task.query';
import { Repository } from 'typeorm';



@QueryHandler(GetAllTasksQuery)
export class GetAllTasksHandler implements IQueryHandler<GetAllTasksQuery> {
  constructor(
    @InjectRepository (Task)
    private readonly taskRepo: Repository<Task>,
  ) {}

  async execute(): Promise<Task[]> {
    return this.taskRepo.find();
  }
}
