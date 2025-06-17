import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/common/entities/addresses.entity';
import { Permission } from 'src/common/entities/permissions.entity';
import { Role } from 'src/common/entities/roles.entity';
import { User } from 'src/common/entities/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt"
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { UpdateCreditLimitDto } from './dto/update-credit-limit.dto';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
        @InjectRepository(Role) private roleRepo: Repository<Role>,
        @InjectRepository(Permission) private permissionRepo: Repository<Permission>,
        @InjectRepository(Address) private addressRepo: Repository<Address>,

    ) { }

    async getAllProfile(role?: string) {
        if (role) {
            return this.userRepo.find({
                where: { role: { name: role } },
                relations: ['role'],
            });
        }

        return this.userRepo.find({
            relations: ['role'],
        });
    }

    async getProfile(userId: number) {
        const user = await this.userRepo.findOne({
            where: { id: userId },
            relations: ['role'],
        });

        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async updateProfile(userId: number, dto: UpdateProfileDto) {
        // console.log(userId);

        const user = await this.userRepo.findOne({ where: { id: userId } });

        if (!user) throw new NotFoundException('User not found');


        if (dto.email && dto.email !== user.email) {
            const existing = await this.userRepo.findOne({
                where: { email: dto.email },
            });
            if (existing) throw new ConflictException('Email already in use');
            user.email = dto.email;
        }

        if (dto.name) user.name = dto.name;
        if (dto.contact_no) user.contact_no = dto.contact_no;
        if (dto.gst_no) user.gst_no = dto.gst_no;

        if (dto.password) {
            const hashed = await bcrypt.hash(dto.password, 10);
            user.password = hashed;
        }

        await this.userRepo.save(user);

        return { message: 'Profile updated successfully' };
    }

    async deleteUser(id: number) {
        const user = await this.userRepo.findOne({ where: { id } });
        if (!user) throw new NotFoundException('User not found');

        return this.userRepo.remove(user);
    }

    async updateUserRole(userId: number, roleName: string) {

        const sanitize = (str: string) => str.trim().replace(/\s+/g, '').toLowerCase();
        const user = await this.userRepo.findOne({ where: { id: userId }, relations: ['role'] });
        if (!user) throw new NotFoundException('User not found');

        const role = await this.roleRepo.findOne({ where: { name: sanitize(roleName) } });
        if (!role) throw new BadRequestException('Invalid role');

        user.role = role;
        await this.userRepo.save(user);

        return { message: `Role updated to ${roleName}` };
    }

    async updateCreditLimit(userId: number, dto: UpdateCreditLimitDto) {
  const user = await this.userRepo.findOne({ where: { id: userId } });

  if (!user) throw new NotFoundException('User not found');

  user.credit_limit = dto.credit_limit;

  await this.userRepo.save(user);
  return { message: 'Credit limit updated successfully' };
}


    //---------------------------------------address--------------------------------------------------

    async addAddress(userId: number, dto: CreateAddressDto) {
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user) throw new NotFoundException('User not found');

        const address = this.addressRepo.create({
            ...dto,
            user: { id: user.id } as User,
        });

        return this.addressRepo.save(address);
    }

    async getMyAddresses(userId: number) {
        return this.addressRepo.find({ where: { user: { id: userId } } });
    }

    async updateAddress(userId: number, id: number, dto: UpdateAddressDto) {
        const address = await this.addressRepo.findOne({
            where: { id },
            relations: ['user'],
        });

        if (!address || address.user.id !== userId)
            throw new ForbiddenException('Unauthorized or not found');

        Object.assign(address, dto);
        return this.addressRepo.save(address);
    }

    async deleteAddress(userId: number, id: number) {
        const address = await this.addressRepo.findOne({
            where: { id },
            relations: ['user'],
        });

        if (!address || address.user.id !== userId)
            throw new ForbiddenException('Unauthorized or not found');

        await this.addressRepo.remove(address);
        return { message: 'Address deleted' };
    }


}
