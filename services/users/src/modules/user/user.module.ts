import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';
import { UpdateLastFeedFetchDateHandler } from './handlers/update-last-feed-fetch-date.handler';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserService, UpdateLastFeedFetchDateHandler],
  exports: [UserService],
})
export class UserModule {}
