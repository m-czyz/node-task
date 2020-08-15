import { Nack, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { UserExchange } from '../../rabbit-mq/exchanges/user-exchanges.const';
import { UserService } from '../user.service';
import { UpdateLastFeedFetchDateCommand } from '../command/update-last-feed-fetch-date.command';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UpdateLastFeedFetchDateHandler {
  constructor(private readonly userService: UserService) {}

  @RabbitSubscribe({
    exchange: UserExchange.name,
    routingKey: 'user.update-last-feed-fetch-date',
    queue: 'user.update-last-feed-fetch-date.queue',
    queueOptions: {
      durable: true,
    },
  })
  async updateLastFeedFetchDateHandler(
    command: UpdateLastFeedFetchDateCommand,
  ) {
    try {
      await this.userService.updateUserLastFeedFetchDate(
        command.userId,
        new Date(command.lastFeedFetchDate),
      );
    } catch (error) {
      Logger.error(
        'UpdateLastFeedFetchDateHandler error',
        error.stack,
        'RabbitMQModule Subscribe',
      );
      return new Nack();
    }
  }
}