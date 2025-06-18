import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BookEntity } from './entity/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AddBookArgs } from './args/addBook.args';
import { updateBookArgs } from './args/updateBook.args';

@Injectable()
export class BookService {

    constructor(@InjectRepository(BookEntity) public readonly bookRepo: Repository<BookEntity>) { }

    async findAllBooks(): Promise<BookEntity[]> {
        let books = await this.bookRepo.find();
        return books;
    }
    async findBookById(id: number): Promise<BookEntity> {
        let book = await this.bookRepo.findOne({ where: { id: id } });
        if (!book) throw new NotFoundException(`${id} yeh wali book nhi he`)
        return book;
    }
    async deleteBook(id: number): Promise<string> {
        await this.bookRepo.delete(id);
        return "Book Has Been Deleted"
    }

    async addBook(addBookArgs: AddBookArgs): Promise<string> {
        let book: BookEntity = new BookEntity();
        book.title = addBookArgs.title;
        book.price = addBookArgs.price;
        await this.bookRepo.save(book);
        return "Book has Been Sucesfully Added";
    }
    async updateBook(updateBookArgs: updateBookArgs): Promise<string> {

        let book  = await this.bookRepo.findOne({
            where: {
                id: updateBookArgs.id
            }})
          if (!book) throw new NotFoundException(`${updateBookArgs.id} yeh wali book nhi he`) 

         if(updateBookArgs.title) book.title = updateBookArgs.title;
         if(updateBookArgs.price) book.price = updateBookArgs.price;
        await this.bookRepo.save(book);
        return "Book has Been Sucesfully Updated";

    }
}