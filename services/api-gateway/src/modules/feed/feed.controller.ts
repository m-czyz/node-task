import { Controller, Get, UseGuards } from '@nestjs/common';
import { FeedService } from './feed.service';
import { HeaderAuthGuard } from '../auth/header-auth.guard';
import { User } from '../auth/user.decorator';
import { IUser } from '../auth/user.interface';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get()
  @UseGuards(HeaderAuthGuard)
  getUserFeed(@User() user: IUser) {
    const feed = this.feedService.getUserFeed();
    return {};
  }
}
