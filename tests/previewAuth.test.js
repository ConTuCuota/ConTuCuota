const request = require('supertest');

const ORIGINAL = process.env.PREVIEW_PASSWORD;

afterEach(() => {
  if (ORIGINAL !== undefined) {
    process.env.PREVIEW_PASSWORD = ORIGINAL;
  } else {
    delete process.env.PREVIEW_PASSWORD;
  }
  jest.resetModules();
});

describe('preview password middleware', () => {
  test('responds 401 when password is missing', async () => {
    process.env.PREVIEW_PASSWORD = 'secret';
    const app = require('../server');
    const res = await request(app).get('/');
    expect(res.status).toBe(401);
    expect(res.headers['www-authenticate']).toMatch(/Basic realm="Preview"/);
  });
});
