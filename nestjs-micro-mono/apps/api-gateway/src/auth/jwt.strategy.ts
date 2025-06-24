import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { PassportStrategy } from '@nestjs/passport';
import { UserServiceClient } from '@proto/user';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private userService : UserServiceClient;
    
      
  constructor(
   @Inject('USER_PACKAGE') private readonly client: ClientGrpc
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'supersecret',
    });
  }

  onModuleInit() {
        this.userService = this.client.getService<UserServiceClient>('UserService');
      }

  async validate(payload: any) {

   console.log("payload =>",payload)

    const user = await this.userService.getUser ({ id: payload.sub }
    ).toPromise();

     console.log("validated user:" , user)



    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    // console.log('JWT validated =>', payload);
    // console.log('Final validated user:', {
    //   id: user.id,
    //   email: user.email,
    //   permissions: user.role.permissions.map(p => p.name),
    // });

    return user;
  }
}