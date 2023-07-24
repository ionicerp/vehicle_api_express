import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import jwtDecode from 'jwt-decode';

interface CompanyData {
    companyIds: string[];
}

interface DecodedToken {
    'https://app.ionicerp.com/app_metadata': CompanyData;
}

const verifyToken = (token: string | undefined): DecodedToken => {
    if (!token) {
        throw new Error('No token provided');
    }
    const decodedToken = jwtDecode(token) as DecodedToken;
    return decodedToken;
};

const validateCompanyIds = (companyIds: string[], companyId: string): void => {
    if (!Array.isArray(companyIds)) {
        throw new Error('companyIds should be an array. Currently the value:' + JSON.stringify(companyIds));
    }
    if (!companyIds.includes(companyId)) {
        throw new Error('Illegal company id detected');
    }
};

const sendErrorResponse = (res: Response, error: Error): void => {
    res.status(500).json({ error: error.message });
};

export const createVehicle = async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(' ')[1];
    const { companyId, organizationId, registrationNumber } = req.body;

    try {
        const decodedToken = verifyToken(token);
        const { 'https://app.ionicerp.com/app_metadata': companyData } = decodedToken;

        validateCompanyIds(companyData.companyIds, companyId);

        const data: any = {
            registration_number: registrationNumber,
        };

        if (companyId) {
            data.company_id = companyId;
        }

        if (organizationId) {
            data.organization_id = organizationId;
        }

        const result = await prisma.vehicle.create({
            data,
        });

        res.status(200).json(result);
    } catch (error) {
        sendErrorResponse(res, error as Error);
    }
};

export const getAllVehicles = async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(' ')[1];
    const companyId = req.query.companyId as string;

    try {
        const decodedToken = verifyToken(token);
        const { 'https://app.ionicerp.com/app_metadata': companyData } = decodedToken;

        validateCompanyIds(companyData.companyIds, companyId);

        const result = await prisma.vehicle.findMany({
            where: {
                company_id: companyId,
            },
        });

        res.status(200).json(result);
    } catch (error) {
        sendErrorResponse(res, error as Error);
    }
};

export const getSingleVehicle = async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(' ')[1];
    const vehicleId = Number(req.params.id);
    const companyId = req.query.companyId as string;

    try {
        const decodedToken = verifyToken(token);
        const { 'https://app.ionicerp.com/app_metadata': companyData } = decodedToken;

        validateCompanyIds(companyData.companyIds, companyId);

        const result = await prisma.vehicle.findFirst({
            where: {
                id: vehicleId,
                company_id: companyId,
            },
        });

        res.status(200).json(result);
    } catch (error) {
        sendErrorResponse(res, error as Error);
    }
};

export const updateVehicle = async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(' ')[1];
    const vehicleId = Number(req.params.id);
    const companyId = req.query.companyId as string;
    const { registrationNumber } = req.body;

    try {
        const decodedToken = verifyToken(token);
        const { 'https://app.ionicerp.com/app_metadata': companyData } = decodedToken;

        validateCompanyIds(companyData.companyIds, companyId);

        const updatedVehicle = await prisma.vehicle.update({
            where: {
                id: vehicleId,
                company_id: companyId,
            },
            data: {
                registration_number: registrationNumber,
            },
        });

        res.status(200).json(updatedVehicle);
    } catch (error) {
        sendErrorResponse(res, error as Error);
    }
};

export const deleteVehicle = async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(' ')[1];
    const vehicleId = Number(req.params.id);
    const companyId = req.query.companyId as string;

    try {
        const decodedToken = verifyToken(token);
        const { 'https://app.ionicerp.com/app_metadata': companyData } = decodedToken;

        validateCompanyIds(companyData.companyIds, companyId);

        const deletedVehicle = await prisma.vehicle.delete({
            where: {
                id: vehicleId,
                company_id: companyId,
            },
        });

        res.status(200).json(deletedVehicle);
    } catch (error) {
        sendErrorResponse(res, error as Error);
    }
};

export const searchVehicles = async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(' ')[1];
    const companyId = req.query.companyId as string;
    const { make, model, year } = req.query;

    try {
        const decodedToken = verifyToken(token);
        const { 'https://app.ionicerp.com/app_metadata': companyData } = decodedToken;

        validateCompanyIds(companyData.companyIds, companyId);

        const searchConditions: {
            company_id: string;
            make?: { contains: string };
            model?: { contains: string };
            year?: number;
        } = {
            company_id: companyId,
        };

        if (make !== undefined) {
            searchConditions.make = { contains: make as string };
        }
        if (model !== undefined) {
            searchConditions.model = { contains: model as string };
        }
        if (year !== undefined) {
            searchConditions.year = Number(year);
        }

        const result = await prisma.vehicle.findMany({
            where: searchConditions,
        });

        res.status(200).json(result);
    } catch (error) {
        sendErrorResponse(res, error as Error);
    }
};
