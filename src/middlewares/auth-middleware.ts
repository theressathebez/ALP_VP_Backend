import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prismaClient } from "../application/database";
import { ResponseError } from "../errors/response-error";
import { UserRequest } from "../type/user-request";
import fs from 'fs';
import path from 'path';

// Load the public key
const publicKey = fs.readFileSync(path.resolve(__dirname, '../keys/public.key'), 'utf8');

export const authMiddleware = async (
    req: UserRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new ResponseError(401, "Authorization header missing");
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            throw new ResponseError(401, "Token missing");
        }

        const decoded: any = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
        const user = await prismaClient.user.findUnique({
            where: { id: decoded.id }
        });

        if (!user) {
            throw new ResponseError(401, "User not found");
        }

        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};