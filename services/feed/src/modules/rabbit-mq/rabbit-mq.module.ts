import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { FeedExchange } from './exchanges/feed-exchanges.const';

const rabbitMQModule = RabbitMQModule.forRootAsync(RabbitMQModule, {
  useFactory: () => ({
    uri: process.env.RABBITMQ_URL,
    exchanges: [FeedExchange],
  }),
});

@Module({
  imports: [rabbitMQModule],
  providers: [],
  exports: [rabbitMQModule],
})
export class RabbitMqModule {}
