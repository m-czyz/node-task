import { Injectable } from '@nestjs/common';
import { FeedEntry } from './feed-entry.entity';
import {
  FindQuery,
  InjectRepository,
  Repository,
  timeuuid, uuid
} from "@iaminfinity/express-cassandra";

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(FeedEntry)
    private readonly feedEntryRepository: Repository<FeedEntry>,
  ) {}

  findByUserIdAndBetweenCreatedAtAndNow(
    userId: string,
    now: Date,
    createdAt?: Date,
  ): Promise<FeedEntry[]> {
    const query: FindQuery<FeedEntry> = {
      userId: uuid(userId),
    };

    query.createdAt = {
      $lte: timeuuid(now),
    };

    if (createdAt) {
      query.createdAt.$gt = timeuuid(createdAt);
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
