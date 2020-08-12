import { Module } from '@nestjs/common';
import { GetUserByIdHandler } from './handlers/get-user-by-id.handler';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useFactory: () => ({
        uri: process.env.RABBITMQ_URL,
        exchanges: [
          {
            name: 'users',
            type: 'topic',
          },
        ],
      }),
    }),
    UserModule,
  ],
  providers: [GetUserByIdHandler],
})
export class RpcModule {}
