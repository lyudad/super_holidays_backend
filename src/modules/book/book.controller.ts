import { Controller, Get } from '@nestjs/common';
import { BookService } from './book.service';

@Controller('api/book')
export class BookController {
  constructor(private readonly bookService: BookService) {}
  @Get()
  getHello(): string {
    return "I'm a get request!";
  }
}
