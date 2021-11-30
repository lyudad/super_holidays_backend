import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, LoginUserDto } from 'modules/users/create-user.dto';
import { UsersService } from 'modules/users/users.service';
import { Session } from 'models/session.model';
import { User } from 'models/users.model';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Session) private sessionRepository,
    @InjectModel(User) private userRepository,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async registration(userDto: CreateUserDto) {
    try {
      const candidate = await this.userService.getUserByEmail(userDto.email);
      if (candidate) {
        throw new HttpException(
          'User with the same email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      const hasPassword = await bcrypt.hash(userDto.password, 5);
      const user = await this.userService.createUser({
        ...userDto,
        password: hasPassword,
      });
      return user;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async login(userDto: LoginUserDto) {
    try {
      const LoginUser = await this.validateUser(userDto);
      try {
        const newSession = await this.sessionRepository.create({
          uid: LoginUser.id,
        });
        const accessToken = this.jwtService.sign(
          { uid: LoginUser.id, sid: newSession.id },
          {
            secret: process.env.SECRET_KEY,
            expiresIn: process.env.JWT_SECRET_TIME,
          },
        );
        const refreshToken = this.jwtService.sign(
          { uid: LoginUser.id, sid: newSession.id },
          {
            secret: process.env.SECRET_KEY,
            expiresIn: process.env.JWT_SECRET_TIME_REFRESH,
          },
        );
        return await this.userService
          .getUserByEmail(LoginUser.email)
          .then(() => {
            const data = {
              accessToken,
              refreshToken,
              sid: newSession.id,
            };
            const user = {
              email: LoginUser.email,
              name: `${LoginUser.first_name}  ${LoginUser.last_name}`,
              role: LoginUser.roles,
              id: LoginUser.id,
              vacation: LoginUser.total_vacations,
              sick_leaves: LoginUser.total_sick_leaves,
            };
            return {
              data,
              user,
            };
          });
      } catch (e) {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async logout({ request, response }) {
    try {
      const session = request.session;
      await this.sessionRepository.destroy({
        where: { id: session.id },
      });
      request.user = null;
      request.session = null;
      return response.end();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async refresh(request) {
    try {
      const session = request.session;
      await this.sessionRepository.destroy({
        where: { id: session.id },
      });
      const newSession = await this.sessionRepository.create({
        uid: request.user.id,
      });
      const accessToken = this.jwtService.sign(
        { uid: request.user.id, sid: newSession.id },
        {
          secret: process.env.SECRET_KEY,
          expiresIn: process.env.JWT_SECRET_TIME,
        },
      );
      const refreshToken = this.jwtService.sign(
        { uid: request.user.id, sid: newSession.id },

        {
          secret: process.env.SECRET_KEY,
          expiresIn: process.env.JWT_SECRET_TIME_REFRESH,
        },
      );
      return {
        data: { accessToken, refreshToken, sid: newSession.id },
      };
    } catch (e) {
      console.log(e.message);
    }
  }

  private async validateUser(userDto: LoginUserDto) {
    try {
      const user = await this.userService.getUserByEmail(userDto.email);
      const passwordEquals = await bcrypt.compare(
        userDto.password,
        user.password,
      );
      if (user && passwordEquals) {
        return user;
      }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
