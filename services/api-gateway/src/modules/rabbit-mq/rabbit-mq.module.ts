import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

const rabbitMQModule = RabbitMQModule.forRootAsync(RabbitMQModule, {
  useFactory: () => ({
    uri: process.env.RABBITMQ_URL,
    exchanges: [
      {
        name: 'users',
        type: 'topic',
      },
    ],
  }),
});

@Module({
  imports: [rabbitMQModule],
  providers: [],
  exports: [rabbitMQModule],
})
export class RabbitMqModule {}
