import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserRole } from "src/users/entities/user.entity";
import { ROLES_KEY } from "./roles.decorator";





@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private reflector :Reflector){}

    canActivate(context: ExecutionContext): boolean  {
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY,[
           context.getHandler(),
           context.getClass(), 
        ]);

        if(!requiredRoles) return true;

        const {user} = context.switchToHttp().getRequest();

        if(!requiredRoles.includes(user.role)){
            throw new ForbiddenException("You don't have permit");
        }

        return true;
    }
}