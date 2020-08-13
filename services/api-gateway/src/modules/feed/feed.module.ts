import { Module } from '@nestjs/common';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { RabbitMqModule } from '../rabbit-mq/rabbit-mq.module';

@Module({
  imports: [RabbitMqModule],
  controllers: [FeedController],
  providers: [FeedService],
})
export class FeedModule {}
