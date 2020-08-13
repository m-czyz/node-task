import { Module } from '@nestjs/common';
import { UserLatestFeedFetchFeedService } from './user-latest-feed-fetch-feed.service';
import { ExpressCassandraModule } from '@iaminfinity/express-cassandra';
import { UserLatestFeedFetch } from './user-latest-feed-fetch.entity';
import { UserFeedService } from './user-feed.service';
import { FeedModule } from '../feed/feed.module';

@Module({
  imports: [
    ExpressCassandraModule.forFeature([UserLatestFeedFetch]),
    FeedModule,
  ],
  providers: [UserFeedService, UserLatestFeedFetchFeedService],
  exports: [UserFeedService, UserLatestFeedFetchFeedService],
})
export class UserFeedModule {}
