import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, getUserByUsername } from '../models/User.js';

const register = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const userId = await createUser(username, hashedPassword);
        res.status(201).json({ userId });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await getUserByUsername(username);
        if (user && await bcrypt.compare(password, user.password_hash)) {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1y' });
            res.json({ token });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export { register, login };
