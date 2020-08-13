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

  it('/feed (GET) and should fail on auth', () => {
    return request(app.getHttpServer())
      .get('/feed')
      .set('user', 'xxx')
      .expect(401);
  });

  it('/feed (GET) and get two feed entries', () => {
    return request(app.getHttpServer())
      .get('/feed')
      .set('user', '5f34142611b9d42ca2d51d34')
      .expect(200)
      .expect(res => expect(res.body.length).toBe(2));
  });

  it('/feed (GET) and get zero feed entries', () => {
    return request(app.getHttpServer())
      .get('/feed')
      .set('user', '5f34142611b9d42ca2d51d34')
      .expect(200)
      .expect(res => expect(res.body.length).toBe(0));
  });
});
