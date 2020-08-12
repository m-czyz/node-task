import { Injectable, Logger } from '@nestjs/common';
import { Nack, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { UserService } from '../../user/user.service';
import { UserResponse } from '../../user/user.response';

type GetUserByIdCommand = {
  userId: string;
};

type GetUserByIdResponse = {
  user: UserResponse;
};

@Injectable()
export class GetUserByIdHandler {
  constructor(private readonly userService: UserService) {}

  @RabbitRPC({
    exchange: 'users',
    routingKey: 'rpc-route',
    queue: 'get-user.rpc',
  })
  public async getUserById({
    userId,
  }: GetUserByIdCommand): Promise<GetUserByIdResponse | Nack> {
    console.log(userId);
    try {
      const user = await this.userService.findOneById(userId);

      return {
        user,
      };
    } catch (error) {
      Logger.log(error.message, error.stack);
      return new Nack();
    }
  }
}
