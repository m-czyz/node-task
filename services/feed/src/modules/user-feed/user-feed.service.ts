import { Injectable } from '@nestjs/common';
import { FeedService } from '../feed/feed.service';
import { UserLatestFeedFetchFeedService } from './user-latest-feed-fetch-feed.service';
import { FeedEntry } from '../feed/feed-entry';

@Injectable()
export class UserFeedService {
  constructor(
    private readonly feedService: FeedService,
    private readonly userLatestFeedFetchFeedService: UserLatestFeedFetchFeedService,
  ) {}

  async findUserLatestFeed(userId: string): Promise<FeedEntry[]> {
    const createdAt = await this.userLatestFeedFetchFeedService.getUserLatestFeedFetch(
      userId,
    );
    const feedEntries = await this.feedService.findByUserIdAndAfterCreatedAt(
      userId,
      createdAt,
    );
    await this.userLatestFeedFetchFeedService.upsertUserLatestFeedFetch(userId);

    return feedEntries;
  }
}
