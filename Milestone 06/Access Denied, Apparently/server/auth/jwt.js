import jwt from 'jsonwebtoken';

const SECRET = 'matrix-secret-key-123'; // Hardcoded for simplicity in this challenge

export const generateToken = (userId) => {
    return jwt.sign({ id: userId }, SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
    return jwt.verify(token, SECRET);
};
