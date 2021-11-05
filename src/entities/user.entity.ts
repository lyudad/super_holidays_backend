import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  SUPER = 'super',
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column()
  isBlocked: boolean;

  @Column()
  isSick: boolean;
}
