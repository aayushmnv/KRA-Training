import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/entity/task.entity';
import { GetTaskByIdQuery } from 'src/queries/get-taskById.query';
import { Repository } from 'typeorm';


@QueryHandler(GetTaskByIdQuery)
export class GetTaskByIdHandler implements IQueryHandler<GetTaskByIdQuery> {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ) {}

  async execute(query: GetTaskByIdQuery): Promise<Task> {

    const task = await this.taskRepo.findOneBy({ id: query.id });
    if(!task) throw new NotFoundException('tasknotfound')
        return task;
  }
}
