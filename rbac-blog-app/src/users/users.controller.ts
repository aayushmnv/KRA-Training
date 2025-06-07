import {
  Controller, Get, Param, Patch, Delete, Body, UseGuards, ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { User as GetUser } from '../auth/decorators/user.decorator';
import { Permissions } from 'src/auth/decorators/permissions.decorator';
import { PermissionGuard } from 'src/auth/guards/permissions.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('super-admin')
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number, @GetUser() user) {
    if (user.role !== 'super-admin' && user.id !== +id) {
      throw new ForbiddenException('You can only view your own profile');
    }
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Permissions('update_user')
  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: any) {
    return this.usersService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Permissions('delete_user')
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Permissions('update_user')
  @Patch(':id/role')
  changeRole(@Param('id') id: number, @Body('role') roleName: string) {
    return this.usersService.changeRole(id, roleName);
  }
}
