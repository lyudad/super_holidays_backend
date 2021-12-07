import { HttpStatus, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BlockUserDto } from './block-user.dto';
import { CreateUserDto } from './create-user.dto';
import { User } from 'models/users.model';
import { UpdateUserDto } from './update-user.dto';
import { RoleUserDto } from './role-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository) {}

  async createUser(dto: CreateUserDto) {
    try {
      const user = await this.userRepository.create(dto);
      return {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.roles,
        vacation: user.total_vacations,
        sick_leaves: user.total_sick_leaves,
      };
    } catch (e) {
      console.log(e.message);
    }
  }

  async getCurrentUser(res) {
    const user = await this.userRepository.findOne({
      where: { id: res.user.id },
    });

    return {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.roles,
      vacation: user.total_vacations,
      sick_leaves: user.total_sick_leaves,
    };
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({
      include: { all: true },
    });

    const newUsers = users.map((user) => {
      return {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.roles,
        isBlocked: user.isBlocked,
        vacation: user.total_vacations,
        sick_leaves: user.total_sick_leaves,
      };
    });
    return newUsers;
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
      const user = await this.userRepository.findOne({
        where: { id },
      });
      if (!user) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      console.log(dto);
      await this.userRepository.update(dto, { where: { id } });
      return await this.userRepository.findOne({
        where: { id },
      });
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

  async updateRoleUser(id: number, dto: RoleUserDto) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      await this.userRepository.update(dto, { where: { id } });
      return await this.userRepository.findOne({
        where: { id },
      });
    } catch (e) {
      console.log(e.message);
    }
  }
}
