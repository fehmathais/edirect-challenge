import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
    id: string;
    name: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

export const currentUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.session?.jwt) {
        return next();
    }

    try {
        // @ts-ignore
        req.currentUser = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
    } catch (e) {}

    next();
};