import { Injectable, Logger } from '@nestjs/common';
import { Nack, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { FeedExchange } from '../../rabbit-mq/exchanges/feed-exchanges.const';
import { UserFeedEntryResponse } from '../../feed/user-feed-entry.response';
import { UserFeedService } from '../../user-feed/user-feed.service';

type GetFeedEntriesByUserIdCommand = {
  userId: string;
};

type GetFeedEntriesByUserIdResponse = {
  feedEntries: UserFeedEntryResponse[];
};

@Injectable()
export class GetFeedEntriesByUserIdHandler {
  constructor(private readonly userFeedService: UserFeedService) {}

  @RabbitRPC({
    exchange: FeedExchange.name,
    routingKey: 'feed-rpc-route',
    queue: 'get-feed-entries.rpc',
  })
  public async getFeedEntriesByUserIdHandler({
    userId,
  }: GetFeedEntriesByUserIdCommand): Promise<
    GetFeedEntriesByUserIdResponse | Nack
  > {
    try {
      const feedEntries = await this.userFeedService.findUserLatestFeed(userId);
      return {
        feedEntries: UserFeedEntryResponse.fromMany(feedEntries),
      };
    } catch (error) {
      Logger.log(error.message, error.stack);
      return new Nack();
    }
  }
}
