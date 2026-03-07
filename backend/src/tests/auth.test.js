const jwt = require('jsonwebtoken');

process.env.JWT_SECRET = 'test_secret';

const { generateToken } = require('../controllers/authController');
const { authorize } = require('../middlewares/authMiddleware');

// --- generateToken ---
describe('generateToken', () => {
  test('returns a valid JWT string', () => {
    const token = generateToken('user123');
    expect(typeof token).toBe('string');
    expect(token.split('.')).toHaveLength(3);
  });

  test('payload contains the correct id', () => {
    const token = generateToken('user123');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    expect(decoded.id).toBe('user123');
  });

  test('token expires in 30 days', () => {
    const token = generateToken('user123');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const thirtyDaysInSeconds = 30 * 24 * 60 * 60;
    expect(decoded.exp - decoded.iat).toBe(thirtyDaysInSeconds);
  });
});

// --- authorize middleware ---
describe('authorize', () => {
  const mockNext = jest.fn();
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('calls next() when user role is allowed', () => {
    const req = { user: { role: 'admin' } };
    authorize('admin', 'teacher')(req, mockRes, mockNext);
    expect(mockNext).toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
  });

  test('returns 403 when user role is not allowed', () => {
    const req = { user: { role: 'student' } };
    authorize('admin', 'teacher')(req, mockRes, mockNext);
    expect(mockNext).not.toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(403);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.stringContaining('student') })
    );
  });
});
