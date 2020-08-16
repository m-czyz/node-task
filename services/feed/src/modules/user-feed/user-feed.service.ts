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
    const now = new Date();
    const feedEntries = await this.feedService.findByUserIdAndBetweenCreatedAtAndNow(
      command.userId,
      now,
      createdAt,
    );

    await this.userService.updateUserLatestFeedFetch(command.userId, now);

    return feedEntries;
  }
}
