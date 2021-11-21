import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'models/users.model';
import { Session } from 'models/session.model';
import { InjectModel } from '@nestjs/sequelize';
// import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @InjectModel(User) private userRepository,
    @InjectModel(Session) private sessionRepository,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'Unauthorized' });
      }
      let payload;
      try {
        payload = this.jwtService.verify(token, {
          secret: process.env.SECRET_KEY,
        });
      } catch (err) {
        console.log(err.message);
      }
      const user = await this.userRepository.findOne({
        where: { id: payload.uid },
      });
      const session = await this.sessionRepository.findOne({
        where: { id: payload.sid },
      });
      console.log(payload.sid);
      if (!user) {
        throw new UnauthorizedException({ message: 'Unauthorized' });
      }
      if (!session) {
        throw new UnauthorizedException({ message: 'Unauthorized' });
      }
      req.user = user;
      req.session = session;
      return true;
    } catch (error) {
      throw new UnauthorizedException({ message: 'Unauthorized' });
    }
  }
}
