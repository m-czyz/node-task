import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { RpcModule } from './modules/rpc/rpc.module';
import { CommandModule } from './modules/command/command.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGO_URL,
      }),
    }),
    UserModule,
    RpcModule,
    CommandModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
