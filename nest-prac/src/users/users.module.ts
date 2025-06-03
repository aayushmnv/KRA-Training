import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports : [TypeOrmModule.forFeature([User]),forwardRef(()=>PostsModule)],
  providers: [UsersService],
  controllers: [UsersController],
  exports : [UsersService]
})
export class UsersModule {}
