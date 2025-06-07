import {
  Controller, Post, Get, Patch, Delete, Param, Body, UseGuards, ForbiddenException,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { User as GetUser } from '../auth/decorators/user.decorator';
import { CreateBlogDto } from './dto/create-blog.dto';
import { Permissions } from 'src/auth/decorators/permissions.decorator';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionGuard } from 'src/auth/guards/permissions.guard';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

@UseGuards(AuthGuard('jwt'), PermissionGuard)
@Permissions('create_blog')
@Post()
create(@Body() dto: CreateBlogDto, @GetUser('id') userId: number) {
  console.log('controller userId =>', userId);
  return this.blogsService.create(dto, userId);
}


  @UseGuards(JwtAuthGuard)
  @Permissions('read_blog')
  @Get()
  findAll() {
    return this.blogsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('mine')
  findMyBlogs(@GetUser('id') userId: number) {
    return this.blogsService.findByUser(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Permissions('update_own_blog')
  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: any, @GetUser() user) {
    return this.blogsService.update(id, dto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Permissions('delete_own_blog', 'delete_any_blog')
  @Delete(':id')
  delete(@Param('id') id: number, @GetUser() user) {
    return this.blogsService.remove(id, user);
  }
}

