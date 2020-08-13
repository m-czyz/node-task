import { RabbitMQExchangeConfig } from '@golevelup/nestjs-rabbitmq/lib/rabbitmq.interfaces';

export const FeedExchange: RabbitMQExchangeConfig = {
  name: 'feed',
  type: 'topic',
};
