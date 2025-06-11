import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registorDto :RegisterDto) {
    return this.authService.register(registorDto);
  }

  @Post('login')
  login(@Body() loginDto : LoginDto) {
    // const { email, password } = body;
    return this.authService.login(loginDto);
  }
   
  @UseGuards(JwtAuthGuard)
  @Get('users')
  getAllUser(){
    return this.authService.getAllUser();
  }

}

