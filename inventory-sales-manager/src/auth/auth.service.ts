import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt"
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/common/entities/roles.entity';
import { User } from 'src/common/entities/users.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(

        @InjectRepository(User) private userRepo: Repository<User>,
        @InjectRepository(Role) private roleRepo : Repository<Role>,
        private jwtService:JwtService,
    ){}

    async getAllUser(){
        const allUser = this.userRepo.find()
        return allUser
    }

    async register(registerDto : RegisterDto) {

        const {name , email , password ,contact_no,gst_no  } =registerDto
        const hashedPassword = await bcrypt.hash(password,10);
        
        const user = await this.userRepo.findOne({
          where: { email }
        });
        if(user) throw new ConflictException("User Already Exist ,Please try login")
        
       const role = await this.roleRepo.findOne({ where: { name: 'customer' } });
       if (!role) throw new Error('User role not found');

        const new_user = this.userRepo.create({
            name,
            email,
            contact_no,
            gst_no,
            password:hashedPassword,
            role
        });
        
        await this.userRepo.save(new_user)

        return {message : `${name} registered successfully as customer`}
    }

    async login (loginDto : LoginDto){

        const user = await this.userRepo.findOne({
            where : {email:loginDto.email},
            relations:['role']
        })
        // console.log(user);

        if(!user || !(await bcrypt.compare(loginDto.password , user?.password))){
            throw new UnauthorizedException('Invalid Credentials')
        }

        const payload = { sub: user.id, email: user.email, role: user.role.name };

        // console.log(payload);
        
        const token = this.jwtService.sign(payload);
        return { access_token: token };
        
    }
}
