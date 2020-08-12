import { Test, TestingModule } from '@nestjs/testing';
import { GetUserByIdHandler } from '../rpc/handlers/user.service';

describe('UserService', () => {
  let service: GetUserByIdHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetUserByIdHandler],
    }).compile();

    service = module.get<GetUserByIdHandler>(GetUserByIdHandler);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
