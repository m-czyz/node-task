import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('FeedController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('after seeding /feed (GET) and get one feed entry', () => {
    return request(app.getHttpServer())
      .get('/feed')
      .set('user', 'f5af320c-6b12-48cb-9169-63f2cf326baa')
      .expect(200)
      .expect(res => expect(res.body.length).toBe(1));
  });

  it('after seeding /feed (GET) and zero feed entries', () => {
    return request(app.getHttpServer())
      .get('/feed')
      .set('user', 'f5af320c-6b12-48cb-9169-63f2cf326baa')
      .expect(200)
      .expect(res => expect(res.body.length).toBe(0));
  });
});