import { HttpStatus, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BlockUserDto } from './block-user.dto';
import { CreateUserDto } from './create-user.dto';
import { User } from 'models/users.model';
import { Booking } from 'models/booking.model';
import { UpdateUserDto } from './update-user.dto';
import { RoleUserDto } from './role-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository) {}

  async createUser(dto: CreateUserDto) {
    try {
      return await this.userRepository.create(dto);
    } catch (e) {
      console.log(e.message);
    }
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
      include: [
        {
          model: Booking,
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
      ],
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

  async blockUser(id: number, dto: BlockUserDto) {
    try {
      await this.userRepository.findOne({
        where: { id },
      });
      await this.userRepository.update(dto, { where: { id } });
      return await this.userRepository.findOne({
        where: { id },
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt'],
        },
      });
    } catch (e) {
      console.log(e.message);
    }
  }

  async deleteUser(id: number) {
    try {
      await this.userRepository.destroy({
        where: { id },
      });
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
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt'],
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updateRoleUser(id: number, dto: RoleUserDto) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      await this.userRepository.update(dto, { where: { id } });
      return await this.userRepository.findOne({
        where: { id },
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt'],
        },
      });
    } catch (e) {
      console.log(e.message);
    }
  }
}
