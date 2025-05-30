import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './interfaces/post.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
    private posts : Post[] = [
        {
            id:1,
            title:"first",
            content:"first content",
            authorName :"Aayush",
            createdAt : new Date()
        }
    ];

    findAll() : Post[]{
        return this.posts;
    }

    findOne(id:number) : Post{
        const singlePost = this.posts.find(post=>post.id===id)
        
        if(!singlePost){
            throw new NotFoundException(`Post with id:${id} not available`)
        }

        return singlePost
    }

    create(createPostData : CreatePostDto) :Post{
        const newPost : Post = {

            id : +(Date.now()),
            ...createPostData,
            createdAt:new Date()

        }
        this.posts.push(newPost)
        return newPost
    }

    update(id:number , updatePostData : UpdatePostDto):Post{
         const currenPostIndexToEdit = this.posts.findIndex(post=>post.id===id);

         if(currenPostIndexToEdit === -1){
            throw new NotFoundException(`Post with id:${id} not available`)
         }
         this.posts[currenPostIndexToEdit] = {
            ...this.posts[currenPostIndexToEdit],
            ...updatePostData,
            updatedAt : new Date()
         }
         return this.posts[currenPostIndexToEdit];
    }

    remove(id:number) :{message:string}{
        const postIndex = this.posts.findIndex(post =>post.id===id);
        if(postIndex === -1){
            throw new NotFoundException(`Post with id:${id} not available`)
         }
         this.posts.splice(postIndex , 1)
         return {message : "Post is deleted"}
    }
    
}
