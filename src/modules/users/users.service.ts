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
      return user;
    } catch (e) {
      console.log(e.message);
    }
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({
      include: { all: true },
    });
    return users.map((e) => {
      return {
        id: e.id,
        first_name: e.first_name,
        last_name: e.last_name,
        email: e.email,
        total_sick_leaves: e.total_sick_leaves,
        total_vacations: e.total_vacations,
        isBlocked: e.isBlocked,
        dates: e.dates.map((e) => {
          return {
            id: e.id,
            start_day: e.start_day,
            end_day: e.end_day,
            type: e.type,
            status: e.status,
            userId: e.userId,
          };
        }),
      };
    });
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
      user.isBlocked = !user.isBlocked;
      await user.save();
      return {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        total_sick_leaves: user.total_sick_leaves,
        total_vacations: user.total_vacations,
        isBlocked: user.isBlocked,
      };
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
