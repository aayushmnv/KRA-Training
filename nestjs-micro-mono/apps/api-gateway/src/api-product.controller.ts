import { Body, Controller, Get, Inject, OnModuleInit, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { CreateProductRequest, PRODUCT_SERVICE_NAME, ProductRequest, ProductResponse, ProductServiceClient, UpdateProductRequest } from "@proto/product";
import { Observable } from "rxjs";
import { JwtAuthGuard } from "./auth/jwt-auth-guard";




@Controller('product')
export class ApiProductController implements OnModuleInit{
 
private productService : ProductServiceClient    

constructor(@Inject('PRODUCT_PACKAGE')private readonly client:ClientGrpc){}

 onModuleInit() {
    this.productService = this.client.getService<ProductServiceClient>(PRODUCT_SERVICE_NAME);
  }
  
  
  @Get()
  @UseGuards(JwtAuthGuard)
  getProduct(@Query('id') id: string) :Observable<ProductResponse> {
   return  this.productService.getProduct({id} as ProductRequest)
   
  }

  
  @Post()
  createUser(@Body() body: CreateProductRequest): Observable<ProductResponse> {
    return this.productService.createProduct(body);
  }

  @Put()
  updateProduct( @Body() body:UpdateProductRequest): Observable<ProductResponse>{
    return this.productService.updateProduct(body)
  }



}

/**
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Query,
  Inject,
  OnModuleInit,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import {
  USER_SERVICE_NAME,
  UserServiceClient,
  CreateUserRequest,
  UpdateUserRequest,
  UserRequest,
  UserResponse,
  Empty,
} from '@proto/user';

@Controller('user')
export class AppController implements OnModuleInit {
  private userService: UserServiceClient;

  constructor(@Inject('USER_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }


  @Get()
  getUser(@Query('id') id: string): Observable<UserResponse> {
    return this.userService.getUser({ id } as UserRequest);
  }


  @Post()
  createUser(@Body() body: CreateUserRequest): Observable<UserResponse> {
    return this.userService.createUser(body);
  }


  @Put()
  updateUser(@Body() body: UpdateUserRequest): Observable<UserResponse> {
    return this.userService.updateUser(body);
  }

  @Delete()
  deleteUser(@Query('id') id: string): Observable<Empty> {
    return this.userService.deleteUser({ id  }as UserRequest);
  }
}
 */