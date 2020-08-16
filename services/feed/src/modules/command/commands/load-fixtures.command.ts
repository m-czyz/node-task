import { Console, Command, createSpinner } from 'nestjs-console';
import { FeedService } from '../../feed/feed.service';
import { timeuuid, uuid } from '@iaminfinity/express-cassandra';
import { FeedEntry } from '../../feed/feed-entry.entity';

import * as rawFeedEntriesFixtures from '../../../fixtures/feed-entries.json';

@Console()
export class LoadFixturesCommand {
  constructor(private readonly feedService: FeedService) {}

  @Command({
    command: 'fixtures',
    description: 'Load fixtures',
  })
  async loadFixtures(): Promise<void> {
    const spin = createSpinner();

    spin.start(`Loading fixtures`);

    const fixtures: FeedEntry[] = rawFeedEntriesFixtures.map(fixture => {
      return {
        userId: uuid(fixture.userId),
        postId: uuid(fixture.postId),
        imageUrl: fixture.imageUrl,
        createdAt: timeuuid(new Date(fixture.createdAt)),
      };
    });

    const feedEntries = await this.feedService.loadMultiple(fixtures, true);

    spin.succeed('Loading done');

    console.log(rawFeedEntriesFixtures);
  }
}
