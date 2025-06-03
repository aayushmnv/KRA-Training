import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { User, UserRole } from 'src/users/entities/user.entity';
import { CurrentUser } from './user.decorator';
import { Roles } from './roles.decorator';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('signup')
    // @UseGuards(AuthGuard('jwt'))
    // @Roles(UserRole.ADMIN)
    register(@Body() createUserDto: CreateUserDto ,
    // @CurrentUser() user: User
) {
        return this.authService.register(createUserDto);
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        const user = await this.authService.validateUser(loginDto.email, loginDto.password);
        return this.authService.login(user);
    }
}
