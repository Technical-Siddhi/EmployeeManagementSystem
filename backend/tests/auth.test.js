const request = require('supertest');
const app = require('../server');
const User = require('../models/User');
const AuditLog = require('../models/AuditLog');

// Mock Mongoose models and Google Auth Service for isolated unit testing
jest.mock('../models/User');
jest.mock('../models/AuditLog');
jest.mock('../services/googleAuthService', () => ({
  verifyGoogleToken: jest.fn().mockImplementation(async (idToken) => {
    if (idToken === 'invalid_token') throw new Error('Invalid token');
    return {
      googleId: 'google_id_123',
      email: 'siddhiraj909@gmail.com',
      name: 'Siddhi Raj',
      avatar: 'https://lh3.googleusercontent.com/a/default-user',
    };
  }),
}));

describe('Authentication API Suite (Login, Register & Google OAuth)', () => {

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

  describe('POST /api/auth/google', () => {
    it('should return 400 Bad Request when idToken is missing', async () => {
      const res = await request(app)
        .post('/api/auth/google')
        .send({});

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body.message).toMatch(/Google ID Token is required/i);
    });

    it('should return 403 Forbidden when Google email is NOT registered in database during login mode', async () => {
      User.findOne.mockResolvedValue(null);
      AuditLog.create.mockResolvedValue({});

      const res = await request(app)
        .post('/api/auth/google')
        .send({ idToken: 'valid_token', mode: 'login' });

      expect(res.statusCode).toEqual(403);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body.message).toMatch(/This email is not registered/i);
    });

    it('should return 200 OK with token when user logs in with existing Google account', async () => {
      const mockUser = {
        _id: '60d5ec49f1b2c80015f8d9b1',
        email: 'siddhiraj909@gmail.com',
        role: 'admin',
        name: 'Siddhi Raj',
        department: 'Engineering',
        provider: 'google',
        save: jest.fn().mockResolvedValue(true)
      };

      User.findOne.mockResolvedValue(mockUser);
      AuditLog.create.mockResolvedValue({});

      const res = await request(app)
        .post('/api/auth/google')
        .send({ idToken: 'valid_token' });

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
