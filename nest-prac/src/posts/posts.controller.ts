import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Request, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
// import { Post as PostInterfase } from './interfaces/post.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as PostEntity } from './entity/post.entity';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/user.decorator'
import { User } from 'src/users/entities/user.entity';

@Controller('posts')
export class PostsController {

    constructor(private readonly postsService: PostsService) { }

    @Get()
    async findAll(): Promise<PostEntity[]> {
        return this.postsService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<PostEntity> {
        return this.postsService.findOne(id)
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.CREATED)
    async create(
        @CurrentUser() user: any,
        @Body() createPostData: CreatePostDto,
    ): Promise<PostEntity> {
        return this.postsService.create(createPostData, user);
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number,
        @Body() updatePostDate: UpdatePostDto
    ): Promise<PostEntity> {
        return this.postsService.update(id, updatePostDate)
    }


    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(
        @Param('id', ParseIntPipe) id: number ,
        @CurrentUser() user :User
        
    ) : Promise<void> {

        this.postsService.remove(id,user);

    }
}
