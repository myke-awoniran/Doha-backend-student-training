import jwt from 'jsonwebtoken';
import { config } from '../config';

export interface TokenPayload {
    userId: string;
    email: string;
    deviceId: string;
}

export function generateAccessToken(payload: TokenPayload): string {
    return jwt.sign(payload, config.jwt.secret, {
        expiresIn: config.jwt.accessExpiresIn as jwt.SignOptions['expiresIn'],
    });
}

export function generateRefreshToken(payload: TokenPayload): string {
    return jwt.sign(payload, config.jwt.secret, {
        expiresIn: config.jwt.refreshExpiresIn as jwt.SignOptions['expiresIn'],
    });
}

export function verifyToken(token: string): TokenPayload {
    return jwt.verify(token, config.jwt.secret) as TokenPayload;
}
