import jwt from 'jsonwebtoken';

const { NODE_ENV, SECRET_KEY } = process.env;

const SECRET_KEY_DEV = 'eyJhbGciOiJIUzI1NiJ9';

export function generateToken(_id) {
  return jwt.sign({ _id }, NODE_ENV === 'production' ? SECRET_KEY : SECRET_KEY_DEV, {
    expiresIn: '7d',
  });
}

export function verifyToken(token) {
  return jwt.verify(token, NODE_ENV === 'production' ? SECRET_KEY : SECRET_KEY_DEV);
}
