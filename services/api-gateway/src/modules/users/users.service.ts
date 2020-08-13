import {
  GatewayTimeoutException,
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { IUser } from '../auth/user.interface';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { UsersExchange } from '../rabbit-mq/exchanges/users-exchanges.const';
import { GetUserResponse } from './get-user.response';

@Injectable()
export class UsersService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async findByUserId(userId: string): Promise<IUser> {
    try {
      const { user } = await this.amqpConnection.request<GetUserResponse>({
        exchange: UsersExchange.name,
        routingKey: 'rpc-route',
        payload: {
          userId,
        },
        timeout: 1000,
      });

      return user;
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes('Failed to receive response within timeout')
      ) {
        Logger.error('User service timeout', error.stack, 'RabbitMQModule RPC');
        throw new GatewayTimeoutException();
      } else {
        Logger.error(
          'General failure of communication with User service',
          error.stack,
          'RabbitMQModule RPC',
        );
        throw new ServiceUnavailableException();
      }
    }
  }
}
