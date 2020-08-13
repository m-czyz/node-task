import { Console, Command, createSpinner } from 'nestjs-console';
import { FeedService } from '../../feed/feed.service';
import { timeuuid, uuid } from '@iaminfinity/express-cassandra';
import { UserLatestFeedFetchFeedService } from '../../user-feed/user-latest-feed-fetch-feed.service';

import * as rawFeedEntriesFixtures from '../../../fixtures/feed-entries.json';

@Console()
export class LoadFixturesCommand {
  constructor(
    private readonly feedService: FeedService,
    private readonly userLatestFeedFetchFeedService: UserLatestFeedFetchFeedService,
  ) {}

  @Command({
    command: 'fixtures',
    description: 'Load fixtures',
  })
  async loadFixtures(): Promise<void> {
    const spin = createSpinner();
    spin.start(`Loading fixtures`);
    const fixtures: any[] = rawFeedEntriesFixtures.map(fixture => {
      return {
        userId: fixture.userId,
        postId: uuid(fixture.postId),
        imageUrl: fixture.imageUrl,
        createdAt: timeuuid(new Date(fixture.createdAt)),
      };
    });

    const feedEntries = await this.feedService.loadMultiple(fixtures, true);

    await this.userLatestFeedFetchFeedService.cleanup();

    spin.succeed('Loading done');

    console.log(feedEntries);
  }
}