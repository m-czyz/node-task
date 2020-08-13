import { IsMongoId } from 'class-validator';

export class AuthRequest {
  @IsMongoId()
  user: string;
}
