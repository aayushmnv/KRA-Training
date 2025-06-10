import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { PERMISSIONS_KEY } from "../decorators/permissions.decorator";



@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.get<string[]>(
      PERMISSIONS_KEY,
      context.getHandler(),
    );

    // console.log("required permissions and permission key =>", requiredPermissions, PERMISSIONS_KEY);

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Missing user');
    }

    // console.log('Logged in user =>', user);


    // if (!user || !user.permissions) {
    //     throw new ForbiddenException('Missing permissions');
    // }

    const userPermissions: string[] = 
    // Array.isArray(user.permissions)
    //   ? user.permissions
    //   :
       user.role?.permissions?.map((p: any) => p.name) || [];

    const hasAll = requiredPermissions.some(p => userPermissions.includes(p));
    if (!hasAll) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return true;
  }
}
