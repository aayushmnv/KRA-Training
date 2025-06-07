import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { RolesGuard } from './auth/guards/roles.guard';
import { PermissionGuard } from './auth/guards/permissions.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new RolesGuard(reflector), new PermissionGuard(reflector));
  await app.listen(process.env.PORT ?? 3000);
  

}
bootstrap();
