import express from 'express';
import bcrypt from 'bcryptjs';
import { users } from '../data/store.js';
import { generateToken } from '../auth/jwt.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { email, password, name } = req.body;
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: Date.now().toString(), email, password: hashedPassword, name };
    users.push(newUser);
    const token = generateToken(newUser.id);
    res.status(201).json({ token, user: { id: newUser.id, email, name } });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = generateToken(user.id);
    res.json({ token, user: { id: user.id, email, name: user.name } });
});

export default router;
