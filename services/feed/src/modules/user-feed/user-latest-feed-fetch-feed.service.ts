import { Injectable } from '@nestjs/common';
import { InjectRepository, Repository } from '@iaminfinity/express-cassandra';
import { UserLatestFeedFetch } from './user-latest-feed-fetch.entity';

@Injectable()
export class UserLatestFeedFetchFeedService {
  constructor(
    @InjectRepository(UserLatestFeedFetch)
    private readonly userLatestFeedFetchRepository: Repository<
      UserLatestFeedFetch
    >,
  ) {}

  async getUserLatestFeedFetch(userId: string): Promise<Date | null> {
    const userLatestFeedFetch = await this.findOneByUser(userId);

    if (userLatestFeedFetch) {
      return userLatestFeedFetch.fetchAt;
    }
    return null;
  }

  async upsertUserLatestFeedFetch(userId: string): Promise<void> {
    const fetchAt = new Date();

    let userLatestFeedFetch:
      | UserLatestFeedFetch
      | undefined = await this.findOneByUser(userId);

    if (userLatestFeedFetch) {
      userLatestFeedFetch.fetchAt = fetchAt;
    } else {
      userLatestFeedFetch = {
        userId,
        fetchAt,
      };
    }

    await this.userLatestFeedFetchRepository
      .save(userLatestFeedFetch)
      .toPromise();

    return null;
  }

  cleanup() {
    return this.userLatestFeedFetchRepository.truncate().toPromise();
  }

  private findOneByUser(userId): Promise<UserLatestFeedFetch> {
    return this.userLatestFeedFetchRepository.findOne({ userId }).toPromise();
  }
}
