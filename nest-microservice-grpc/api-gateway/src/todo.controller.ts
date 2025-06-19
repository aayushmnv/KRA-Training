import { Controller, Get, Post, Body, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { TodoService, CreateTodoRequest } from './interfaces/todo.interface';

@Controller('todos')
export class TodoController implements OnModuleInit {
  private todoService: TodoService;

  constructor(@Inject('TODO_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.todoService = this.client.getService<TodoService>('TodoService');
  }

  @Post()
  async createTodo(@Body() body: CreateTodoRequest) {
    return this.todoService.createTodo(body);
  }

  @Get()
  async getTodosByUser(@Body('userId') userId: string) {
    return this.todoService.getTodosByUserId({ userId });
  }
}
