import { Controller, Get, UseGuards } from '@nestjs/common';
import { FeedService } from './feed.service';
import { HeaderAuthGuard } from '../auth/header-auth.guard';
import { User } from '../auth/user.decorator';
import { IUser } from '../auth/user.interface';
import { FeedEntryResponse } from './feed-entry.response';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { authHeader } from '../auth/auth-header.const';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get()
  @UseGuards(HeaderAuthGuard)
  @ApiTags('feed')
  @ApiOperation({ summary: 'Get user feed' })
  @ApiHeader({ name: authHeader, description: 'user id', required: true })
  @ApiResponse({
    status: 200,
    description: 'User feed',
    type: [FeedEntryResponse],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getUserFeed(@User() user: IUser): Promise<FeedEntryResponse[]> {
    return this.feedService.getUserFeed(user.id);
  }
}
