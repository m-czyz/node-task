import { Module } from '@nestjs/common';
import { GetFeedEntriesByUserIdHandler } from './handlers/get-feed-entries-by-user-id.handler';
import { RabbitMqModule } from '../rabbit-mq/rabbit-mq.module';
import { UserFeedModule } from '../user-feed/user-feed.module';

@Module({
  imports: [RabbitMqModule, UserFeedModule],
  providers: [GetFeedEntriesByUserIdHandler],
})
export class RpcModule {}
