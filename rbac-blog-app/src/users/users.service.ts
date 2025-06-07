import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity/user.entity';
import { Role } from '../roles/role.entity/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Role) private roleRepo: Repository<Role>
  ) {}

  findAll() {
    return this.userRepo.find({ relations: ['role'] });
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({ where: { id }, relations: ['role'] });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: number, dto: any) {
    await this.userRepo.update(id, dto);
    return { message: 'User updated' };
  }

  async remove(id: number) {
    await this.userRepo.delete(id);
    return { message: 'User deleted' };
  }

  async changeRole(id: number, roleName: string) {
    const role = await this.roleRepo.findOne({ where: { name: roleName } });
    if (!role) throw new NotFoundException('Role not found');

    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    user.role = role;
    await this.userRepo.save(user);
    return { message: `Role changed to ${roleName}` };
  }
}

