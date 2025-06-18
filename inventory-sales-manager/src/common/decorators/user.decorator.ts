import { createParamDecorator, ExecutionContext } from "@nestjs/common";



export const currentUser = createParamDecorator(
( data : unknown  ,ctx : ExecutionContext)=>{
    const request = ctx.switchToHttp().getRequest();

    const user= request?.user;

    return user;
}

);


/**import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data:keyof any , ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    data ? user?.[data] : user;
  },
); */