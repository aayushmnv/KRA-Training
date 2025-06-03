import { forwardRef, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entity/post.entity';
import { UsersModule } from 'src/users/users.module';


@Module({
  imports : [
    TypeOrmModule.forFeature([Post]) ,forwardRef(()=> UsersModule),
  ],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule  implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('posts'); 
  }
}
