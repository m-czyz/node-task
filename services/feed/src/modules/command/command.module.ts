import { Module } from '@nestjs/common';
import { ConsoleModule } from 'nestjs-console';
import { FeedModule } from '../feed/feed.module';
import { LoadFixturesCommand } from './commands/load-fixtures.command';

@Module({
  imports: [ConsoleModule, FeedModule],
  providers: [LoadFixturesCommand],
})
export class CommandModule {}
