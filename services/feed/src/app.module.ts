import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RpcModule } from './modules/rpc/rpc.module';
import { CommandModule } from './modules/command/command.module';
import { ExpressCassandraModule } from '@iaminfinity/express-cassandra';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ExpressCassandraModule.forRootAsync({
      useFactory: () => ({
        clientOptions: {
          keyspace: process.env.CASSANDRA_HOST_KEYSPACE,
          contactPoints: [process.env.CASSANDRA_HOST],
        },
      }),
    }),
    CommandModule,
    RpcModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
