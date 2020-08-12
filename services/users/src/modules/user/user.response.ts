import { User } from './user.schema';

export class UserResponse {
  id: string;
  email: string;

  static fromModel(user: User): UserResponse {
    return {
      id: user._id,
      email: user.email,
    };
  }
}