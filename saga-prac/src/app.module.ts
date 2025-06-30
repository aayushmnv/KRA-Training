import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersController } from './users/users.controller';

@Module({
  imports: [UsersModule,CqrsModule],
  controllers: [AppController,UsersController],
  providers: [AppService],
})
export class AppModule {}
