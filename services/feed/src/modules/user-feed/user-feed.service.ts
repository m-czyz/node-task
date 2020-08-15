import { Injectable } from '@nestjs/common';
import { FeedService } from '../feed/feed.service';
import { FeedEntry } from '../feed/feed-entry.entity';
import { GetFeedEntriesFromDateByUserIdCommand } from '../rpc/command/get-feed-entries-by-user-id.request';
import { UserService } from '../user/user.service';

@Injectable()
export class UserFeedService {
  constructor(
    private readonly feedService: FeedService,
    private readonly userService: UserService,
  ) {}

  async findUserFeedFromDate(
    command: GetFeedEntriesFromDateByUserIdCommand,
  ): Promise<FeedEntry[]> {
    const createdAt = command.fromDate ? new Date(command.fromDate) : null;
    const feedEntries = await this.feedService.findByUserIdAndAfterCreatedAt(
      command.userId,
      createdAt,
    );

    await this.userService.updateUserLatestFeedFetch(
      command.userId,
      this.getNewestPostDate(feedEntries),
    );

    return feedEntries;
  }

  private getNewestPostDate(feedEntries: FeedEntry[]): Date {
    return feedEntries[0] ? feedEntries[0].createdAt.getDate() : new Date();
  }
}
