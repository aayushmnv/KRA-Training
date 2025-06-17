import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { PERMISSIONS_KEY } from "../decorators/permissions.decorator";


@Injectable()
export class PermissionGuard implements CanActivate {
   constructor(private reflector :Reflector){}

   canActivate(context: ExecutionContext): boolean  {
       const requiredPermissions = this.reflector.get<string[]>(
        PERMISSIONS_KEY,context.getHandler()
       );
       console.log("required permissions=>",requiredPermissions);
       

       if(!requiredPermissions || requiredPermissions.length===0){
        return true;
       }

       const request = context.switchToHttp().getRequest();
       const user = request.user

       console.log("user:>",user)

       if(!user){
        throw new ForbiddenException('Missing user');
       }

       const userPermissions : string[] = user?.role?.permissions?.map((p:any)=>p.name) || [];

       console.log("user permissions=>", userPermissions);
       

       const isAuthorised = requiredPermissions.some(p=>userPermissions.includes(p));
      
     if(!isAuthorised) throw new ForbiddenException('You are not Authorised to do this action')
     
     return true;

   }
}