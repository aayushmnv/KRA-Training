import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async getUser(data: { id: string }): Promise<User | null> {
    return this.userRepo.findOne({ where: { id: data.id } });
  }

  async createUser(data: { name: string; email: string; password: string }): Promise<User> {
    const user = this.userRepo.create(data);
    return this.userRepo.save(user);
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    
   const user =  await this.userRepo.findOne({ where: { id } })
   if(!user) throw new NotFoundException('user not found to update')
   
    await this.userRepo.update(id, data);

    return user;

  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepo.delete(id);
  }
}
