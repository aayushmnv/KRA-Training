import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostInterfase } from './interfaces/post.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';


@Controller('posts')
export class PostsController {

    constructor(private readonly postsService: PostsService) { }

    @Get()
    findAll(@Query('search') search?: string): PostInterfase[] {

        const getAllpost = this.postsService.findAll()

        if (search) {
            return getAllpost.filter(item => item.title.toLocaleLowerCase().includes(search.toLowerCase()));
        }

        return getAllpost;

    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): PostInterfase {
        return this.postsService.findOne(id)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createPostData: CreatePostDto,
    ): PostInterfase {
        return this.postsService.create(createPostData);

    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number,
        @Body() updatePostDate: UpdatePostDto
    ): PostInterfase {
        return this.postsService.update(id, updatePostDate)
    }
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseIntPipe) id: number): void {

        this.postsService.remove(id);

    }
}
