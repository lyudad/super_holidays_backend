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
      return this.filterUser(user);
    } catch (e) {
      console.log(e.message);
    }
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({
      include: { all: true },
    });

    const newUsers = users.map((user) => {
      return this.filterUser(user);
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
      await this.userRepository.findOne({
        where: { id },
      });
      await this.userRepository.update(dto, { where: { id } });
      const user = await this.userRepository.findOne({
        where: { id },
      });
      return this.filterUser(user);
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
      const newUser = await this.userRepository.findOne({
        where: { id },
      });
      return this.filterUser(newUser);
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
      const newUser = await this.userRepository.findOne({
        where: { id },
      });
      return this.filterUser(newUser);
    } catch (e) {
      console.log(e.message);
    }
  }
  private filterUser(user: User) {
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.roles,
      isBlocked: user.isBlocked,
      vacation: user.total_vacations,
      sick_leaves: user.total_sick_leaves,
      dates: user?.dates.map((e) => ({
        id: e.id,
        start_day: e.start_day,
        end_day: e.end_day,
        type: e.type,
        status: e.status,
        userId: e.userId,
      })),
    };
  }
}
