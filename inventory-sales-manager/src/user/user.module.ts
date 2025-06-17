import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/common/entities/users.entity';
import { Role } from 'src/common/entities/roles.entity';
import { Permission } from 'src/common/entities/permissions.entity';
import { Address } from 'src/common/entities/addresses.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([User,Role,Permission,Address])
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
