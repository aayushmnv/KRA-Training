import { Controller, Post, Body, UnauthorizedException, BadRequestException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { ClientGrpc } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { UserServiceClient, UserResponse, CreateUserRequest, UserRequestByEmail } from 'libs/generated/user';

@Controller('auth')
export class AuthController {
  private userService: UserServiceClient;

  constructor(@Inject('USER_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<UserServiceClient>('UserService');
  }

  @Post('register')
  async register(@Body() body: CreateUserRequest) {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser = this.userService.createUser({ ...body, password: hashedPassword } as CreateUserRequest);
    return newUser;
  }

  @Post('login')
  async login(@Body() body: any) {
    // console.log(body)
    const user = await this.userService.getUserByEmail({ email:body.email }).toPromise()
    
    
    if(!user) throw new BadRequestException('user not available')
  // console.log("user loggedin :" , user)
    const passwordMatch = await bcrypt.compare(body.password , user.password );
    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');

    const token = jwt.sign({ sub: user.id, email: user.email }, 'supersecret', { expiresIn: '1d' });

    return {msg:"logged in ",  token } ;
  }
}
