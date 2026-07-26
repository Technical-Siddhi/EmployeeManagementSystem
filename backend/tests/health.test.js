const request = require('supertest');
const app = require('../server');

describe('GET /health API Endpoint', () => {
  it('should return status UP with system metrics', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'UP');
    expect(res.body).toHaveProperty('service');
    expect(res.body).toHaveProperty('database');
    expect(res.body).toHaveProperty('system');
  });
});
