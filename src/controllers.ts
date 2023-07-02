import { Request, Response } from 'express';

export const get = async (req: Request, res: Response) => {
    try {
        res.status(200).json({ result: 'haha', keys: process.env.SECRET_KEY });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}