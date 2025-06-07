import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { BlogsModule } from './blogs/blogs.module';
import { Permission } from './permissions/permission.entity/permission.entity';
import { Role } from './roles/role.entity/role.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Aayush1209',
      database: 'rbac_blog_app',
      autoLoadEntities: true,     
      synchronize: true,  
    }),
    TypeOrmModule.forFeature([Role, Permission]),
    UsersModule,
    RolesModule,
    PermissionsModule,
    BlogsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
