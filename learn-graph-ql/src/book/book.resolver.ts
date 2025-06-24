import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Book } from "./schema/book.schema";
import { BookService } from "./book.service";
import { AddBookArgs } from "./args/addBook.args";
import { updateBookArgs } from "./args/updateBook.args";


@Resolver(of => Book)
export class BookResolver {

    constructor(private readonly bookService: BookService) { }

    @Query(returns => [Book], { name: "books" })
    getAllBooks() {
        return this.bookService.findAllBooks();

    }
    @Query(returns => [Book], { name: "bookById" })
    getBookById(@Args({ name: 'bookId', type: () => Int }) id: number) {
        return this.bookService.findBookById(id);

    }

    @Mutation(returns => String, { name: "deleteBook" })
    deleteBookById(@Args({ name: 'bookId', type: () => Int }) id: number) {
        return this.bookService.deleteBook(id);
    }

    @Mutation(returns => String, { name: "addBook" })
    addBook(@Args("addBookArgs") addBookArgs: AddBookArgs) {
        return this.bookService.addBook(addBookArgs);

    }

    @Mutation(returns => String, { name: "updateBook" })
    updateBook(@Args("updateBookArgs") updateBookArgs: updateBookArgs) {
        return this.bookService.updateBook(updateBookArgs);
    }
}