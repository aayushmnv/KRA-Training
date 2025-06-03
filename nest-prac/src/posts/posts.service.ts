import { Injectable, NotFoundException } from '@nestjs/common';
// import { Post } from './interfaces/post.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entity/post.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    private usersService: UsersService,
  ) { }

  async findAll(): Promise<Post[]> {
    return this.postsRepository.find({
      relations: ['user'],
    });
  }

  async findOne(id: number): Promise<Post> {
    const singlePost = await this.postsRepository.findOneBy({ id })

    if (!singlePost) {
      throw new NotFoundException(`Post with id:${id} not available`)
    }

    return singlePost
  }

  async create(createPostData: CreatePostDto, user: User): Promise<Post> {


    const newPost = this.postsRepository.create({
      title: createPostData.title,
      content: createPostData.content,
      user: user,
    });

    return this.postsRepository.save(newPost);
  }


  async update(id: number, updatePostData: UpdatePostDto): Promise<Post> {
    const findPostToUpdate = await this.findOne(id);

    if (updatePostData.title) {
      findPostToUpdate.title = updatePostData.title;
    }

    if (updatePostData.content) {
      findPostToUpdate.content = updatePostData.content;
    }

    return this.postsRepository.save(findPostToUpdate);
  }


  async remove(id: number): Promise<void> {
    const findPostToDelete = await this.findOne(id)

    await this.postsRepository.remove(findPostToDelete)
  }

}
