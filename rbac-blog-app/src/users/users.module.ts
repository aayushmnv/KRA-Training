import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/roles/role.entity/role.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Role])],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
