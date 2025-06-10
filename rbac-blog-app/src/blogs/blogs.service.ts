import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './blog.entity/blog.entity';
import { User } from '../users/user.entity/user.entity';
import { CreateBlogDto } from './dto/create-blog.dto';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog) private blogRepo: Repository<Blog>,
    @InjectRepository(User) private userRepo: Repository<User>
  ) {}

  async create(dto: CreateBlogDto, userId: number) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');
    const blog = this.blogRepo.create({
  ...dto,
  user: { id: user.id } as any, 
});
    return this.blogRepo.save(blog);
  }

  findAll() {
    return this.blogRepo.find({ relations: ['user'] });
  }

  findByUser(userId: number) {
    return this.blogRepo.find({ where: { user: { id: userId } }, relations: ['user'] });
  }

  async update(id: number, dto: any, user: any) {
    const blog = await this.blogRepo.findOne({ where: { id }, relations: ['user'] });
    if (!blog) throw new NotFoundException('Blog not found');

    if (user.role !== 'super-admin' && blog.user.id !== user.id) {
      throw new ForbiddenException('You can only update your own blogs');
    }

    Object.assign(blog, dto);
    return this.blogRepo.save(blog);
  }

  async remove(id: number, user: any) {
    
    const blog = await this.blogRepo.findOne({ where: { id }, relations: ['user'] });
    if (!blog) throw new NotFoundException('Blog not found');

    if (user.role !== 'super-admin' && blog.user.id !== user.id) {
      throw new ForbiddenException('You can only delete your own blogs');
    }

    await this.blogRepo.remove(blog);
    return { message: 'Blog deleted' };
  }
}
