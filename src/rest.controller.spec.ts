import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { RestController } from './rest.controller';

describe('RestController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [RestController],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /rest/echo', () => {
    it('should handle a single request', async () => {
      const contentType = 'application/json';
      const response = await request(app.getHttpServer())
        .get('/rest/echo')
        .set('Content-Type', contentType)
        .send();
      expect(response.status).toBe(200);
    });
  });
});
