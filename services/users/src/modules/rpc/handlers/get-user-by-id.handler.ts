import { Injectable, Logger } from '@nestjs/common';
import { Nack, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { UserService } from '../../user/user.service';
import { UserResponse } from '../response/user.response';
import { UserExchange } from '../../rabbit-mq/exchanges/user-exchanges.const';

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
    exchange: UserExchange.name,
    routingKey: 'rpc-route',
    queue: 'get-user.rpc',
  })
  public async getUserById({
    userId,
  }: GetUserByIdCommand): Promise<GetUserByIdResponse | Nack> {
    try {
      const user = await this.userService.findOneById(userId);
      return {
        user: user ? UserResponse.fromModel(user) : null,
      };
    } catch (error) {
      Logger.log(error.message, error.stack);
      return new Nack();
    }
  }
}
