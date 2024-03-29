import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { ConsoleModule } from 'nestjs-console';
import { LoadFixturesCommand } from './commands/load-fixtures.command';

@Module({
  imports: [ConsoleModule, UserModule],
  providers: [LoadFixturesCommand],
})
export class CommandModule {}
