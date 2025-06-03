import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Request, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
// import { Post as PostInterfase } from './interfaces/post.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as PostEntity } from './entity/post.entity';
import { AuthGuard } from '@nestjs/passport';
import {User as CurrentUser} from 'src/auth/user.decorator'

@Controller('posts')
export class PostsController {

    constructor(private readonly postsService: PostsService) { }

    @Get()
    async findAll() : Promise<PostEntity[]> {
        return this.postsService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<PostEntity>{
        return this.postsService.findOne(id)
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.CREATED)
    async create(@Request() req, @Body() createPostData: CreatePostDto,
    @CurrentUser() user: any,
    ): Promise<PostEntity> {
        return this.postsService.create(createPostData , req.user);

    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number,
        @Body() updatePostDate: UpdatePostDto
    ): Promise<PostEntity> {
        return this.postsService.update(id, updatePostDate)
    }
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {

        this.postsService.remove(id);

    }
}
