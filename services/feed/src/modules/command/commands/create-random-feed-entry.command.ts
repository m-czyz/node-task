import { Console, Command, createSpinner } from 'nestjs-console';
import { FeedService } from '../../feed/feed.service';
import { timeuuid, uuid } from '@iaminfinity/express-cassandra';
import { FeedEntry } from '../../feed/feed-entry';
import { v4 as uuid4 } from 'uuid';

@Console()
export class CreateRandomFeedEntryCommand {
  constructor(private readonly feedService: FeedService) {}

  @Command({
    command: 'feed-entry:random <userId>',
    description: 'Load fixtures',
  })
  async loadFixtures(userId: string): Promise<void> {
    const spin = createSpinner();
    spin.start(`Creating new feed entry for user: ${userId}`);

    const feedEntry: FeedEntry = {
      userId,
      postId: uuid(),
      imageUrl: `https://via.placeholder.com/${uuid4()}`,
      createdAt: timeuuid(new Date()),
    };

    await this.feedService.createNew(feedEntry);

    spin.succeed('Loading done');

    console.log(feedEntry);
  }
}
