import { User } from './user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOneById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      return null;
    }
    return user;
  }

  async updateUserLastFeedFetchDate(
    id: string,
    lastFeedFetchDate: Date,
  ): Promise<void> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new Error(`User with id: ${id} was not found in updateUserLastFeedFetchDate`)
    }

    user.lastFeedFetchDate = lastFeedFetchDate;
    await user.save();
  }

  async loadMultiple(users: User[], force: boolean): Promise<User[]> {
    if (force) {
      await this.userModel.deleteMany({}).exec();
    }
    return this.userModel.insertMany(users);
  }
}
