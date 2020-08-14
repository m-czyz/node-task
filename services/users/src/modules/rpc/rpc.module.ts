import { Module } from '@nestjs/common';
import { GetUserByIdHandler } from './handlers/get-user-by-id.handler';
import { UserModule } from '../user/user.module';
import { RabbitMqModule } from '../rabbit-mq/rabbit-mq.module';

@Module({
  imports: [RabbitMqModule, UserModule],
  providers: [GetUserByIdHandler],
})
export class RpcModule {
}
