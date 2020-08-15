import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { RabbitMqModule } from '../rabbit-mq/rabbit-mq.module';

@Module({
  imports: [RabbitMqModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
