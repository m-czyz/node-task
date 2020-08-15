import { User } from '../../user/user.schema';

export class UserResponse {
  id: string;
  email: string;
  lastFeedFetchAt: string;

  static fromModel(user: User): UserResponse {
    return {
      id: user._id,
      email: user.email,
      lastFeedFetchAt: user.lastFeedFetchDate?.toISOString() ?? null,
    };
  }
}
