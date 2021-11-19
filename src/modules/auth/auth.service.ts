import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto, LoginUserDto } from 'modules/users/create-user.dto';
import { UsersService } from 'modules/users/users.service';
import { User } from 'models/users.model';
import { Session } from 'models/session.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Session)
    @InjectModel(User)
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(userDto: LoginUserDto) {
    try {
      const LoginUser = await this.validateUser(userDto);
      try {
        const newSession = await Session.create({
          uid: LoginUser.id,
        });
        const accessToken = this.jwtService.sign(
          { uid: LoginUser.id, sid: newSession.id },
          process.env.SECRET_KEY,
          {
            expiresIn: '1h',
          },
        );
        const refreshToken = this.jwtService.sign(
          { uid: LoginUser.id, sid: newSession.id },
          process.env.SECRET_KEY,
          {
            expiresIn: '2d',
          },
        );
        return UserSchema.findOne({ email }).exec((err, data) => {
          if (err) {
            next(err);
          }
          return res.status(httpCode.OK).send({
            status: 'success',
            code: httpCode.OK,
            data: {
              headers: {
                accessToken,
                refreshToken,
                sid: newSession._id,
              },
              email: data.email,
              name: data.name,
              picture: data.picture,
              id: data._id,
              createdAt: data.createdAt,
            },
          });
        });
      } catch (e) {
        console.log(e);
      }
      const token = await this.generateToken(User);
      const user = {
        email: User.email,
        name: `${User.first_name}  ${User.last_name}`,
        role: User.roles,
      };
      return {
        token,
        user,
      };
    } catch (e) {
      console.log(e.message);
    }
  }
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
      console.log(e.message);
    }
  }

  private async generateToken(user: User) {
    try {
      const payload = { email: user.email, id: user.id, roles: user.roles };
      return {
        token: this.jwtService.sign(payload),
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
      console.log(e.message);

      throw new UnauthorizedException({
        message: 'Incorrect login or password',
      });
    }
  }
}
