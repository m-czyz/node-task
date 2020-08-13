import { Injectable } from '@nestjs/common';
import { FeedEntry } from './feed-entry';
import {
  FindQuery,
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

  findByUserIdAndAfterCreatedAt(
    userId: string,
    createdAt?: Date,
  ): Promise<FeedEntry[]> {
    const query: FindQuery<FeedEntry> = {
      userId,
    };

    if (createdAt) {
      query.createdAt = {
        $gt: timeuuid(createdAt),
      };
    }

    return this.feedEntryRepository.find(query).toPromise();
  }

  createNew(feedEntry: FeedEntry): Promise<FeedEntry> {
    return this.feedEntryRepository.save(feedEntry).toPromise();
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
