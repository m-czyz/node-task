import { Test, TestingModule } from '@nestjs/testing';
import { UserFeedService } from './user-feed.service';

describe('UserFeedService', () => {
  let service: UserFeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserFeedService],
    }).compile();

    service = module.get<UserFeedService>(UserFeedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
