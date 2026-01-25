import jwt, { SignOptions } from 'jsonwebtoken';

export interface jwtPayload {
    userId: string;
}

export const generateToken = (payload: jwtPayload): string =>
    jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: (process.env.JWT_EXPIRES_IN ?? '7d') as SignOptions['expiresIn'],
    });

export const verifyToken = (token: string): jwtPayload =>(
    jwt.verify(
        token,
        process.env.JWT_SECRET as string
    ) as jwtPayload
);
