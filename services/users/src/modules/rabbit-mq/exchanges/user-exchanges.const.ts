import { RabbitMQExchangeConfig } from '@golevelup/nestjs-rabbitmq/lib/rabbitmq.interfaces';

export const UserExchange: RabbitMQExchangeConfig = {
  name: 'users',
  type: 'topic',
};
