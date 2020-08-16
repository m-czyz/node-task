import { Injectable, Logger } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { UsersExchange } from '../rabbit-mq/exchanges/users-exchanges.const';

type UpdateUserLatestFeedFetchMessage = {
  userId: string;
  lastFeedFetchDate: string;
};

@Injectable()
export class UserService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async updateUserLatestFeedFetch(
    userId: string,
    lastFeedFetchDate: Date,
  ): Promise<void> {
    try {
      const message: UpdateUserLatestFeedFetchMessage = {
        userId,
        lastFeedFetchDate: lastFeedFetchDate.toISOString(),
      };
      await this.amqpConnection.publish(
        UsersExchange.name,
        'user.update-last-feed-fetch-date',
        message,
      );
    } catch (error) {
      Logger.error(
        'RabbitMQ error',
        error.stack,
        'RabbitMQModule Communication',
      );
    }
  }
}
