import { Injectable, Logger } from '@nestjs/common';
import { Nack, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { FeedResponse } from '../../feed/feed.response';
import { FeedService } from '../../feed/feed.service';
import { FeedExchange } from '../../rabbit-mq/exchanges/feed-exchanges.const';

type GetFeedEntriesByUserIdCommand = {
  userId: string;
};

type GetFeedEntriesByUserIdResponse = {
  feedEntries: FeedResponse;
};

@Injectable()
export class GetFeedEntriesByUserIdHandler {
  constructor(private readonly feedService: FeedService) {}

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
      const feedEntries = await this.feedService.findByUserId(userId);
      console.log(feedEntries);
      return {
        feedEntries,
      };
    } catch (error) {
      Logger.log(error.message, error.stack);
      return new Nack();
    }
  }
}
