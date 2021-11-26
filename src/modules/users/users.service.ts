import { HttpStatus, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BlockUserDto } from './block-user.dto';
import { CreateUserDto } from './create-user.dto';
import { User } from 'models/users.model';
import { UpdateUserDto } from './update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository) {}

  async createUser(dto: CreateUserDto) {
    try {
      const user = await this.userRepository.create(dto);
      return user;
    } catch (e) {
      console.log(e.message);
    }
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({
      include: { all: true },
    });
    return users;
  }

  async getUserByEmail(email: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
        include: { all: true },
      });
      return user;
    } catch (e) {
      console.log(e.message);
    }
  }

  async blockUser(dto: BlockUserDto) {
    try {
      const user = await this.userRepository.findByPk(dto.userId);
      if (!user) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      user.isBlocked = true;
      await user.save();
      return user;
    } catch (e) {
      console.log(e.message);
    }
  }

  async deleteUser(id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
      });
      return this.userRepository.delete(user);
    } catch (e) {
      console.log(e.message);
    }
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
      });
      if (!user) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      await this.userRepository.update(dto, { where: { id } });
      return await this.userRepository.findOne({
        where: { id },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
