import { RabbitMQExchangeConfig } from '@golevelup/nestjs-rabbitmq/lib/rabbitmq.interfaces';

export const UsersExchange: RabbitMQExchangeConfig = {
  name: 'users',
  type: 'topic',
};
