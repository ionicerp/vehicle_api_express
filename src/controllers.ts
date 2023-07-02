import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY;
const loginUser = process.env.LOGIN_USER;
const loginPass = process.env.LOGIN_PASS;

export const postApiLogin = (req: Request, res: Response) => {
    try {
        console.log('trying to get token');

        const { username, password } = req.body;
        if (username === loginUser && password === loginPass) {
            const token = jwt.sign({ username }, secretKey as string, { expiresIn: '1h' });
            return res.json({ token });
        }
        return res.status(401).json({ error: 'Invalid credentials' });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

export const get = async (req: Request, res: Response) => {
    try {
        res.status(200).json({ result: 'haha', version: '1', keys: process.env.SECRET_KEY });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}