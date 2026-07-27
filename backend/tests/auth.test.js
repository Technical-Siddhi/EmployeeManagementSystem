const request = require('supertest');
const app = require('../server');
const User = require('../models/User');
const AuditLog = require('../models/AuditLog');

// Mock Mongoose models for isolated endpoint testing
jest.mock('../models/User');
jest.mock('../models/AuditLog');

describe('Authentication API Suite (Login & Social Authentication)', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/auth/login', () => {
    it('should return 400 Bad Request when email or password is missing', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: '' });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('msg', 'email and password are required');
    });
  });

  describe('POST /api/auth/social', () => {
    it('should return 400 Bad Request for unsupported social provider', async () => {
      const res = await request(app)
        .post('/api/auth/social')
        .send({ provider: 'unsupported_platform', email: 'test@company.com' });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body.message).toMatch(/Invalid social provider/i);
    });

    it('should return 403 Forbidden when social login email is NOT registered in database', async () => {
      User.findOne.mockResolvedValue(null);
      AuditLog.create.mockResolvedValue({});

      const res = await request(app)
        .post('/api/auth/social')
        .send({
          provider: 'facebook',
          email: 'unregistered_random_user_999@gmail.com',
          name: 'Unregistered User',
          providerId: 'fb_999'
        });

      expect(res.statusCode).toEqual(403);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body.message).toMatch(/This email is not registered/i);
    });

    it('should return 200 OK with token & user payload when social user IS registered', async () => {
      const mockUser = {
        _id: '60d5ec49f1b2c80015f8d9b1',
        email: 'siddhiraj909@gmail.com',
        role: 'admin',
        name: 'Siddhi Raj',
        department: 'Engineering',
        provider: 'facebook',
        save: jest.fn().mockResolvedValue(true)
      };

      User.findOne.mockResolvedValue(mockUser);
      AuditLog.create.mockResolvedValue({});

      const res = await request(app)
        .post('/api/auth/social')
        .send({
          provider: 'facebook',
          email: 'siddhiraj909@gmail.com',
          name: 'Siddhi Raj',
          providerId: 'fb_12345'
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user).toHaveProperty('email', 'siddhiraj909@gmail.com');
    });
  });

  describe('POST /api/auth/logout', () => {
    it('should return 200 OK on successful logout', async () => {
      const res = await request(app).post('/api/auth/logout');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('msg', 'Logged out');
    });
  });

});
