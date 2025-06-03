import { ConflictException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User, UserRole } from 'src/users/entities/user.entity';
import { CurrentUser } from './user.decorator';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto ) {
  const { email ,role} = createUserDto;
   // role === UserRole.ADMIN && 
  // if (CurrentUser?.role !== UserRole.ADMIN) {
  //   throw new ForbiddenException('Only admins can create admins');
  // }

  // if email is already registered
  const existingUser = await this.usersService.findByEmail(email);
  if (existingUser) {
    throw new ConflictException('Email already registered');
  }

  const user = await this.usersService.create(createUserDto);

  const { password, ...userData } = user;
  return userData;
}


  async validateUser(email: string, plainPassword: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(plainPassword, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const { password, ...userData } = user;
    return userData;
  }

  async login(user: any) {
    const payload = { sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
