import { Console, Command, createSpinner } from 'nestjs-console';
import { FeedEntry } from '../../feed-entry/feed-entry';
import { FeedService } from '../../feed/feed.service';
import { uuid } from '@iaminfinity/express-cassandra';

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

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const rawFeedEntriesFixtures = require('../../../fixtures/feed-entries.json');

    const fixtures: FeedEntry[] = rawFeedEntriesFixtures.map(fixture => {
      return {
        id: uuid(fixture.id),
        userId: fixture.userId,
        postId: uuid(fixture.id),
        imageUrl: fixture.imageUrl,
        creatorId: fixture.creatorId,
        seenAt: fixture.seenAt,
        createdAt: new Date(fixture.createdAt),
      };
    });

    const feedEntries = await this.feedService.loadMultiple(fixtures, true);

    spin.succeed('Loading done');

    console.log(feedEntries);
  }
}