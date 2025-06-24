import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserRequest, UpdateUserRequest, UserRequest, UserResponse, UserRequestByEmail, UserLoginResponse } from 'libs/generated/user';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) { }

  async getUser(data: UserRequest): Promise<UserResponse> {
    const user = await this.userRepo.findOne({ where: { id: data.id } });
    if (!user) throw new NotFoundException('User not found')
    return user;
  }

  async createUser(data: CreateUserRequest): Promise<UserResponse> {
    const user = this.userRepo.create(data);
    return this.userRepo.save(user);
  }

  async updateUser(data: UpdateUserRequest) {

    const user = await this.userRepo.findOne({ where: { id: data.id } })
    if (!user) throw new NotFoundException('user not found to update')

    await this.userRepo.update(data.id, data);

    return user;

  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepo.delete(id);
  }

  async getUserByEmail(data: UserRequestByEmail) :Promise<UserLoginResponse>{
    const user = await this.userRepo.findOne({ where: { email: data.email } ,select: ['id', 'email', 'password']});
    if (!user) throw new NotFoundException('User not found')
    return user;
  }
}
