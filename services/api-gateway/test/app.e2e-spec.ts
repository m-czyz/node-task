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
      .set('user', 'f5af320c-6b12-48cb-9169-63f2cf326baa')
      .expect(200)
      .expect(res => expect(res.body.length).toBe(2));
  });

  it('/feed (GET) and get zero feed entries', async () => {
    // add extra time for user service processing
    await new Promise(r => setTimeout(r, 1000));

    return request(app.getHttpServer())
      .get('/feed')
      .set('user', 'f5af320c-6b12-48cb-9169-63f2cf326baa')
      .expect(200)
      .expect(res => expect(res.body.length).toBe(0));
  });

  it('as user with empty feed /feed (GET) and get zero feed entries', async () => {
    return request(app.getHttpServer())
      .get('/feed')
      .set('user', '364565e4-c94d-409e-8486-e32da39fe5ae')
      .expect(200)
      .expect(res => expect(res.body.length).toBe(0));
  });
});