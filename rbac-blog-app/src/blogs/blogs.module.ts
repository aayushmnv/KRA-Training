import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { Blog } from './blog.entity/blog.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Role } from 'src/roles/role.entity/role.entity';
import { User } from 'src/users/user.entity/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Blog,Role,User])],
  providers: [BlogsService,UsersService],
  controllers: [BlogsController]
})
export class BlogsModule {}
