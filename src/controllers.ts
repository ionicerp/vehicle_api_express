import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client'
import jwtDecode from 'jwt-decode';

const prisma = new PrismaClient()

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

export const privateCheck = async (req: Request, res: Response) => {
    try {
        res.status(200).json({
            message: "Hello from a private endpoint! You need to be authenticated to see this."
        });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

export const getSampleEnvValue = async (req: Request, res: Response) => {
    try {
        res.status(200).json({
            sample_value: process.env.SAMPLE_VALUE
        });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

export const createVehicle = async (req: Request, res: Response) => {
    try {
        const { registrationNumber } = req.body;
        const result = await prisma.vehicle.create({
            data: {
                registration_number: registrationNumber,
            }
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

export const getVehicle = async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(' ')[1]; // Assuming the token is sent in the "Authorization" header as "Bearer <token>"
    try {

        if (!token) {
            throw new Error('No token provided');
        }
        const jwtDecodedToken: any = jwtDecode(token);
        const companyIds = jwtDecodedToken['https://app.ionicerp.com/app_metadata'];

        const result = await prisma.vehicle.findMany();
        res.status(200).json({ result: result, companyIds: companyIds });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}