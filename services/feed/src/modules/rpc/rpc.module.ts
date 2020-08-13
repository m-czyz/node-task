import { Module } from '@nestjs/common';
import { FeedModule } from '../feed/feed.module';
import { GetFeedEntriesByUserIdHandler } from './handlers/get-feed-entries-by-user-id.handler';
import { RabbitMqModule } from '../rabbit-mq/rabbit-mq.module';

@Module({
  imports: [RabbitMqModule, FeedModule],
  providers: [GetFeedEntriesByUserIdHandler],
})
export class RpcModule {}
