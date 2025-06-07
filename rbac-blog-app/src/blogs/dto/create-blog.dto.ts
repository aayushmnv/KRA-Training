import { IsNotEmpty, IsString, MinLength } from "class-validator"


export class CreateBlogDto{
    
    @IsNotEmpty({message:"Title required"})
    @IsString({message: 'Title must be a string'})
    @MinLength(3,{message: "Title length is less than 3"})
    title : string
    
    @IsNotEmpty({message:"Title required"})
    @IsString({message: 'Title must be a string'})
    content : string 
}