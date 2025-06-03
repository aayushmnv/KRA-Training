import { Controller, Get, Post, Body, Param, ParseIntPipe, UseGuards, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserRole } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CurrentUser } from 'src/auth/user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto): Promise<User> {
  //   return this.usersService.create(createUserDto);            
  // }            

  @UseGuards(AuthGuard('jwt'),RolesGuard)            
  @Roles(UserRole.ADMIN)            
  @Get()            
  findAll(): Promise<User[]> {            
    return this.usersService.findAll();            
  }            

  @Get(':id')            
  findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {            
    return this.usersService.findOne(id);            
  }            

    
   @Delete(':id')
   @UseGuards(AuthGuard('jwt'),RolesGuard)
   @Roles(UserRole.ADMIN)
  remove(
    
     @Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
