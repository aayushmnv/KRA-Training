import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { GrpcMethod, ClientGrpc } from '@nestjs/microservices';
import { v4 as uuid } from 'uuid';

interface CreateTodoRequest {
  userId: string;
  title: string;
}

interface GetTodosByUserIdRequest {
  userId: string;
}

interface TodoResponse {
  id: string;
  userId: string;
  title: string;
}

interface TodoList {
  todos: TodoResponse[];
}

interface UserService {
  getUserById(data: { id: string }): Promise<{ id: string; name: string; email: string }>;
}

@Injectable()
export class TodoService implements OnModuleInit {
  private todos: TodoResponse[] = [];
  private userService: UserService;

  constructor(@Inject('USER_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<UserService>('UserService');
  }

  @GrpcMethod('TodoService', 'CreateTodo')
  async createTodo(data: CreateTodoRequest): Promise<TodoResponse> {
    // Check if user exists via UserService
    const user = await this.userService.getUserById({ id: data.userId });

    if (!user) {
      throw new Error(`User with id ${data.userId} does not exist`);
    }

    const todo: TodoResponse = {
      id: uuid(),
      userId: data.userId,
      title: data.title,
    };

    this.todos.push(todo);
    return todo;
  }

  @GrpcMethod('TodoService', 'GetTodosByUserId')
  getTodosByUserId(data: GetTodosByUserIdRequest): TodoList {
    const userTodos = this.todos.filter(todo => todo.userId === data.userId);
    return { todos: userTodos };
  }
}
