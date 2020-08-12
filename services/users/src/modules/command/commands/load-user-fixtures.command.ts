import { Console, Command, createSpinner } from 'nestjs-console';
import { UserService } from '../../user/user.service';
import * as usersFixtures from '../../../fixtures/user.json';
import { User } from '../../user/user.schema';

@Console()
export class LoadUserFixturesCommand {
  constructor(private readonly userService: UserService) {}

  @Command({
    command: 'fixtures:user',
    description: 'Load user fixtures',
  })
  async loadUserFixtures(): Promise<void> {
    const spin = createSpinner();
    spin.start(`Loading fixtures for users`);

    const users = await this.userService.loadMultiple(
      usersFixtures as User[],
      true,
    );

    spin.succeed('Loading done');

    console.log(users);
  }
}