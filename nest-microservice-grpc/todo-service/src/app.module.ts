import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { TodoService } from './todo.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name : 'USER_PACKAGE',
        transport:Transport.GRPC,
        options:{
          package:'user',
          protoPath : join(__dirname,'../../proto/user.proto'),
        }
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService,TodoService],
  exports : [AppModule]
})
export class AppModule {}
