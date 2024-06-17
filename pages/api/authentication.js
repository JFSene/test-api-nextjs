import bcrypt from 'bcryptjs';
import { generateToken } from '../../lib/auth';

// Mock user data, replace with actual user lookup in your database
const mockUser = {
  id: 'user-id-123',
  username: 'testUser',
  passwordHash: bcrypt.hashSync('pass1234', 10), // Hash the password in a real app
};

export default async function handler(req, res) {
  const { username, password } = req.body;

  // Replace with actual user lookup
  if (username !== mockUser.username) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const passwordMatch = await bcrypt.compare(password, mockUser.passwordHash);
  if (!passwordMatch) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const token = generateToken(mockUser);
  res.status(200).json({ token });
}
