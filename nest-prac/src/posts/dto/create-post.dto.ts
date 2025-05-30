import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";


export class CreatePostDto{

    @IsNotEmpty({message:"Title required"})
    @IsString({message: 'Title must be a string'})
    @MinLength(3,{message: "Title length is less than 3"})
    @MaxLength(25,{message: "Title length is greater than expected"})
    title : string
   
    @IsNotEmpty({message:"Title required"})
    @IsString({message: 'Title must be a string'})
    content : string

    @IsNotEmpty({message:"authorName required"})
    @IsString({message: 'authorName must be a string'})
    @MinLength(3,{message: "authorName length is less than 3"})
    @MaxLength(25,{message: "authorName length is greater than expected"})
    authorName : string



}