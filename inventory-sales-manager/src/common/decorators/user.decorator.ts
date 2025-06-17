import { createParamDecorator, ExecutionContext } from "@nestjs/common";



export const currentUser = createParamDecorator(
(data:keyof any , ctx : ExecutionContext)=>{
    const request = ctx.switchToHttp().getRequest();

    const user= request.user;

    return data ? user?.[data] : user;
}

);


/**import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user; // should contain { sub, email, role }
  },
); */