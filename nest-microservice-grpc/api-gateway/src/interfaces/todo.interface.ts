export interface CreateTodoRequest {
  userId: string;
  title: string;
}

export interface TodoService {
  createTodo(data: CreateTodoRequest): any;
  getTodosByUserId(data: { userId: string }): any;
}
