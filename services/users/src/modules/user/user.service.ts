import { User } from './user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserResponse } from './user.response';
import { Types } from 'mongoose';

export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOneById(id: string): Promise<UserResponse> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      return null;
    }
    return UserResponse.fromModel(user);
  }

  async loadMultiple(users: User[], force: boolean): Promise<User[]> {
    if (force) {
      await this.userModel.deleteMany({}).exec();
    }
    return this.userModel.insertMany(users);
  }
}