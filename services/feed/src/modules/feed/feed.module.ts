import { Module } from '@nestjs/common';
import { FeedService } from './feed.service';
import { ExpressCassandraModule } from '@iaminfinity/express-cassandra';
import { FeedEntry } from './feed-entry.entity';

@Module({
  imports: [ExpressCassandraModule.forFeature([FeedEntry])],
  providers: [FeedService],
  exports: [FeedService],
})
export class FeedModule {}
