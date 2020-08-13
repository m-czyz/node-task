import { Module } from '@nestjs/common';
import { ConsoleModule } from 'nestjs-console';
import { FeedModule } from '../feed/feed.module';
import { LoadFixturesCommand } from './commands/load-fixtures.command';
import { UserFeedModule } from '../user-feed/user-feed.module';
import { CreateRandomFeedEntryCommand } from './commands/create-random-feed-entry.command';

@Module({
  imports: [ConsoleModule, FeedModule, UserFeedModule],
  providers: [LoadFixturesCommand, CreateRandomFeedEntryCommand],
})
export class CommandModule {}
