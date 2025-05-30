import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule  implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('posts'); // applies to all /posts routes
  }
}
