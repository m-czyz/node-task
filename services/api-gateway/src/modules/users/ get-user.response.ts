import { IUser } from '../auth/user.interface';

export class GetUserResponse {
  user: IUser | null;
}