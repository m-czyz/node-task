import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RpcModule } from './modules/rpc/rpc.module';
import { CommandModule } from './modules/command/command.module';
import { FeedEntryModule } from './modules/feed-entry/feed-entry.module';
import { FeedModule } from './modules/feed/feed.module';
import { ExpressCassandraModule } from '@iaminfinity/express-cassandra';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ExpressCassandraModule.forRootAsync({
      useFactory: () => ({
        clientOptions: {
          keyspace: 'feed',
          contactPoints: ['feed-database'],
        },
        ormOptions: {
          migration: 'drop',
        },
      }),
    }),
    CommandModule,
    FeedEntryModule,
    FeedModule,
    RpcModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
