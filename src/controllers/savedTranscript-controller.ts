import { Request, Response, NextFunction } from "express";
import { SavedTranscriptService } from "../services/savedTranscript-service";
import { CreateSavedTranscript } from "../models/savedTranscript-model";
import { prismaClient } from "../application/database";
import { ResponseError } from "../errors/response-error";
import { UserRequest } from "../type/user-request";

export class SavedTranscriptController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.body.user_id; // Use user_id from the request body

            // Check if the user exists
            const user = await prismaClient.user.findUnique({
                where: { id: userId }
            });

            if (!user) {
                throw new ResponseError(404, "User not found");
            }

            const request: CreateSavedTranscript = {
                ...req.body,
                user_id: userId
            };
            const response = await SavedTranscriptService.create(request);
            res.status(201).json({ data: response, user: user });
        } catch (error) {
            next(error);
        }
    }

    // Other methods...

    static async getById(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const response = await SavedTranscriptService.getById(id);
            res.status(200).json({ data: response });
        } catch (error) {
            next(error);
        }
    }
    
    static async update(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const request: CreateSavedTranscript = req.body;
            const response = await SavedTranscriptService.update(id, request);
            res.status(200).json({ data: response });
        } catch (error) {
            next(error);
        }
    }
    
    static async delete(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            await SavedTranscriptService.delete(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    static async getAllByUserId(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const userId = parseInt(req.params.userId);
            const response = await SavedTranscriptService.getAllByUserId(userId);
            res.status(200).json({ data: response });
        } catch (error) {
            next(error);
        }
    }
}