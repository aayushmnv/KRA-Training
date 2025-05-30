import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, ValidationPipe} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userservice: UserService) {}

  @Post()
  create(@Body() userDto: UserDto) {
    return this.userservice.create(userDto);
  }

  @Get()
  findAll() {
    return this.userservice.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userservice.findOne(id);
  }

//   @Put(':id')
//   update(
//     @Param('id', ParseIntPipe) id: number,
//     @Body() updateUserDto: UpdateUserDto,
//   ) {
//     return this.usersService.update(id, updateUserDto);
//   }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userservice.remove(id);
  }
}

// /*
// Get (user/)
// Get (/user/:id)
// Post (/user)
// */