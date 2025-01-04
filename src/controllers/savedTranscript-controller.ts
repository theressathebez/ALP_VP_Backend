import { Request, Response, NextFunction } from "express";
import { SavedTranscriptService } from "../services/savedTranscript-service";
import { CreateSavedTranscript } from "../models/savedTranscript-model";

export class SavedTranscriptController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateSavedTranscript = req.body;
            const response = await SavedTranscriptService.create(request);
            res.status(201).json({ data: response });
        } catch (error) {
            next(error);
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const response = await SavedTranscriptService.getById(id);
            res.status(200).json({ data: response });
        } catch (error) {
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const request: CreateSavedTranscript = req.body;
            const response = await SavedTranscriptService.update(id, request);
            res.status(200).json({ data: response });
        } catch (error) {
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            await SavedTranscriptService.delete(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    static async getAllByUserId(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = parseInt(req.params.userId);
            const response = await SavedTranscriptService.getAllByUserId(userId);
            res.status(200).json({ data: response });
        } catch (error) {
            next(error);
        }
    }
}