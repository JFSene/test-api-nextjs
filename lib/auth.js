import jwt from 'jsonwebtoken';

const SECRET_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VyLWlkLTEyMyIsImlhdCI6MTcxODQ5NTczMiwiZXhwIjoxNzE4NDk5MzMyfQ.LwHgFRkuQgxohKoayN1eP99-8-V9vhHfsqf7sywuUcE'; // Use a secure, unique key in a real app

export function generateToken(user) {
  return jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (e) {
    return null;
  }
}
