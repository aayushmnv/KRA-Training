import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository  } from 'typeorm';
import { User } from 'src/users/user.entity/user.entity';
import { Role } from 'src/roles/role.entity/role.entity';

@Injectable()
export class AuthService {
  constructor(
  @InjectRepository(User) private userRepo: Repository<User>,
  @InjectRepository(Role) private roleRepo: Repository<Role>, 
  private jwtService: JwtService,
) {}

  async register(name: string, email: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const role = await this.roleRepo.findOne({ where: { name: 'user' } });
  if (!role) throw new Error('User role not found');

  const user = this.userRepo.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  await this.userRepo.save(user);
  return { message: 'User registered successfully as "user"' };
}
async login(email: string, password: string) {
  console.log("email:"+ email, "," ,"password:"+ password);
  
  const user = await this.userRepo.findOne({
    where: { email },
    relations: ['role'],
    select: ['id', 'email', 'password', 'role'] // include password manually
  });

  console.log('Email:', email);
  console.log('Password from req:', password);
  console.log('User fetched from DB:', user);


  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new UnauthorizedException('Invalid credentials');
  }

  const payload = { sub: user.id, email: user.email, role: user.role.name };
  const token = this.jwtService.sign(payload);
  return { access_token: token };
}

}
