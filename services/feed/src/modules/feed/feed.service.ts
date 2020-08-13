import { Injectable } from '@nestjs/common';
import { FeedEntry } from '../feed-entry/feed-entry';
import {
  InjectRepository,
  Repository,
  timeuuid,
} from '@iaminfinity/express-cassandra';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(FeedEntry)
    private readonly feedEntryRepository: Repository<FeedEntry>,
  ) {}

  findByUserId(userId: string): Promise<FeedEntry[]> {
    return this.feedEntryRepository
      .find({
        userId,
        createdAt: {
          $gt: timeuuid(new Date("2017-08-12T23:12:29.216Z")),
        },
      })
      .toPromise();
  }

  async loadMultiple(
    feedEntries: FeedEntry[],
    force: boolean,
  ): Promise<FeedEntry[]> {
    if (force) {
      await this.feedEntryRepository.truncate().toPromise();
    }
    return this.feedEntryRepository.save(feedEntries).toPromise();
  }
}
