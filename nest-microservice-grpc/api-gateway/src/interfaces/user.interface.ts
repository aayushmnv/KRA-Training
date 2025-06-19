export interface CreateUserRequest {
  id: string;
  name: string;
  email: string;
}

export interface UserService {
  CreateUser(data: CreateUserRequest): any;
  getUserById(data: { id: string }): any;
}
