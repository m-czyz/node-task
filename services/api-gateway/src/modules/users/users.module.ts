import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { RabbitMqModule } from '../rabbit-mq/rabbit-mq.module';

@Module({
  imports: [RabbitMqModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
