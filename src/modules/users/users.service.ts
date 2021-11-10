import { HttpStatus, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BlockUserDto } from './block-user.dto';
import { CreateUserDto } from './create-user.dto';
import { User } from 'models/users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({
      include: { all: true },
    });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async blockUser(dto: BlockUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    user.isBlocked = true;
    await user.save();
    return user;
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return this.userRepository.delete(user);
  }
}
