import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Book } from 'entities/book.entity';
import { BookModule } from 'modules/book/book.module';
import { User } from 'entities/user.entity';
import { UsersModule } from 'modules/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'super_holidays',
      entities: [User, Book],
      synchronize: true,
    }),
    BookModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
