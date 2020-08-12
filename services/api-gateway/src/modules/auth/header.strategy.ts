import { Strategy } from 'passport-http-header-strategy';
import { PassportStrategy } from '@nestjs/passport';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { authHeader } from './auth-header.const';
import { isUUID } from '@nestjs/common/utils/is-uuid';

@Injectable()
export class HeaderStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      header: authHeader,
    });
  }

  async validate(userId: string): Promise<any> {
    // if (!isUUID(userId)) {
    //   throw new BadRequestException(
    //     `"${authHeader}" header value should be valid  string`,
    //   );
    // }
    const user = await this.authService.validateUser(userId);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
