import { Injectable, NotFoundException } from '@nestjs/common';
import { error } from 'console';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  private users = [{id:0,name:"aayush" , email: "aayush@gmail.com" , password:"asdaasd+65"}];
  private idCounter = 2;

  create(userDto: UserDto) {
    const item = { id: this.idCounter++, ...userDto };
    this.users.push(item);
    return item;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

//   update(id: number, updateUserDto: UpdateUserDto) {
//     const user = this.findOne(id);
//     const updatedUser = { ...user, ...updateUserDto };
//     const index = this.users.findIndex((u) => u.id === id);
//     this.users[index] = updatedUser;
//     return updatedUser;
//   }

  remove(id: number) {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) throw new NotFoundException('User not found');
    const removed = this.users.splice(index, 1);
    return removed[0];
  }
}
