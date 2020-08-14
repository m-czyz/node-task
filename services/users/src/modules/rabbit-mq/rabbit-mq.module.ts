import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { UserExchange } from './exchanges/user-exchanges.const';

const rabbitMQModule = RabbitMQModule.forRootAsync(RabbitMQModule, {
  useFactory: () => ({
    uri: process.env.RABBITMQ_URL,
    exchanges: [UserExchange],
  }),
});

@Module({
  imports: [rabbitMQModule],
  providers: [],
  exports: [rabbitMQModule],
})
export class RabbitMqModule {}
