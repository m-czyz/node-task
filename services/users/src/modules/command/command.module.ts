import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { ConsoleModule } from 'nestjs-console';
import { LoadUserFixturesCommand } from './commands/load-user-fixtures.command';

@Module({
  imports: [ConsoleModule, UserModule],
  providers: [LoadUserFixturesCommand],
})
export class CommandModule {}
