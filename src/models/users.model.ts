import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { Booking } from 'models/booking.model';

interface UserCreationAttrs {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

enum Roles {
  USER = 'user',
  ADMIN = 'admin',
  SUPER = 'super',
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'unique' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  user_id: number;

  @ApiProperty({ example: 'Ivan', description: 'First name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string;

  @ApiProperty({ example: 'Ivanov', description: 'Last name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name: string;

  @ApiProperty({ example: 'ivanov@gmail.com', description: 'email' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({ example: '123456', description: 'password' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({ example: '5', description: 'total sick leaves' })
  @Column({
    type: DataType.TINYINT,
    defaultValue: 5,
  })
  total_sick_leaves: number;

  @ApiProperty({ example: '15', description: 'total vacations' })
  @Column({
    type: DataType.TINYINT,
    defaultValue: 15,
  })
  total_vacations: number;

  @ApiProperty({ example: 'true', description: 'user is blocked' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isBlocked: boolean;

  @ApiProperty({ example: 'user', description: 'user role' })
  @Column({
    type: DataType.ENUM('user', 'admin', 'super'),
    defaultValue: 'vacation',
  })
  roles: Roles;

  @HasMany(() => Booking)
  dates: Booking[];
}
