import * as bcrypt from 'bcrypt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User, UserRole } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {

        const { username, email, password ,role} = createUserDto

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.usersRepository.create(
            {
                username,
                email,
                password: hashedPassword,
                role : UserRole.USER
            });
        return this.usersRepository.save(user);
    }
    async findAll(): Promise<User[]> {
        return this.usersRepository.find()
    }

    async findByEmail(email: string): Promise<User | null> {
  return this.usersRepository.findOneBy({ email });
 }


    async findOne(id: number): Promise<User> {
        const user = await this.usersRepository.findOne({
            where: { id },
            relations: ['posts'],
        });
        if (!user) throw new NotFoundException(`User not found with ID ${id}`);
        return user;
    }

}
