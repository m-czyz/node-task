import {
  GatewayTimeoutException,
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { FeedExchange } from '../rabbit-mq/exchanges/feed-exchanges.const';
import { FeedResponse } from './feed.response';
import { IFeedEntry } from './feed-entry.interface';

@Injectable()
export class FeedService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async getUserFeed(userId: string): Promise<IFeedEntry[]> {
    try {
      const { feedEntries } = await this.amqpConnection.request<FeedResponse>({
        exchange: FeedExchange.name,
        routingKey: 'feed-rpc-route',
        payload: {
          userId,
        },
        timeout: 1000,
      });

      return feedEntries;
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes('Failed to receive response within timeout')
      ) {
        Logger.error('Feed service timeout', error.stack, 'RabbitMQModule RPC');
        throw new GatewayTimeoutException();
      } else {
        Logger.error(
          'General failure of communication with Feed service',
          error.stack,
          'RabbitMQModule RPC',
        );
        throw new ServiceUnavailableException();
      }
    }
  }
}
