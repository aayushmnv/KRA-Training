import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { currentUser } from 'src/common/decorators/user.decorator';
import { User } from 'src/common/entities/users.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Permissions } from 'src/common/decorators/permissions.decorator';
import { PermissionGuard } from 'src/common/guards/permissions.guard';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { UpdateCreditLimitDto } from './dto/update-credit-limit.dto';


@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService,
    ) { }


    @Get('me')
    @UseGuards(JwtAuthGuard)
    getProfile(@currentUser() user: User) {
        return this.userService.getProfile(user.id);
    }

    @Get()
    @UseGuards(JwtAuthGuard,PermissionGuard)
    @Permissions('is-admin')
    getAllProfile(@Query('role') role?: string) {
        return this.userService.getAllProfile(role);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('me')
    async updateProfile(
        @currentUser() user: any,
        @Body() dto: UpdateProfileDto,
    ) {
        return this.userService.updateProfile(user.id, dto);
    }


    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Permissions('is-admin')
    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.deleteUser(id);
    }


    @Patch(':id/role')
    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Permissions('is-admin')
    updateUserRole(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserRoleDto) {
        return this.userService.updateUserRole(id, dto.role);
    }

    @Patch(':id/credit-limit')
    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Permissions('is-admin')
    updateCreditLimit(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateCreditLimitDto
    ) {
        return this.userService.updateCreditLimit(id, dto);
    }



    //--------------------address------------------------------------------------------------------



    @Post('address')
    @UseGuards(JwtAuthGuard)
    async addAddress(
        @currentUser() user: any,
        @Body() dto: CreateAddressDto,
    ) {
        return this.userService.addAddress(user.id, dto);
    }

    @Get('address')
    @UseGuards(JwtAuthGuard)
    async getMyAddresses(@currentUser() user: any) {
        return this.userService.getMyAddresses(user.id);
    }

    @Patch('address/:id')
    @UseGuards(JwtAuthGuard)
    async updateAddress(
        @currentUser() user: any,
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateAddressDto,
    ) {
        return this.userService.updateAddress(user.id, id, dto);
    }

    @Delete('address/:id')
    @UseGuards(JwtAuthGuard)
    async deleteAddress(
        @currentUser() user: any,
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.userService.deleteAddress(user.id, id);
    }
}





