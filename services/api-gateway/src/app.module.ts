import { Module } from '@nestjs/common';
import { FeedModule } from './modules/feed/feed.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RabbitMqModule } from './modules/rabbit-mq/rabbit-mq.module';

@Module({
  imports: [
    FeedModule,
    UsersModule,
    AuthModule,
    ConfigModule.forRoot(),
    RabbitMqModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
