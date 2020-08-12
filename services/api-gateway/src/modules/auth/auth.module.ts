import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { HeaderStrategy } from './header.strategy';
import { HeaderAuthGuard } from './header-auth.guard';

@Module({
  imports: [PassportModule, UsersModule],
  providers: [AuthService, HeaderStrategy, HeaderAuthGuard],
})
export class AuthModule {}
