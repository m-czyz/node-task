import { Module } from '@nestjs/common';
import { UserFeedService } from './user-feed.service';
import { FeedModule } from '../feed/feed.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [FeedModule, UserModule],
  providers: [UserFeedService],
  exports: [UserFeedService],
})
export class UserFeedModule {}
