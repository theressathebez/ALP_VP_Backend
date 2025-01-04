import { prismaClient } from "../application/database";
import { ResponseError } from "../errors/response-error";
import { CreateSavedTranscript, SavedTranscriptResponse } from "../models/savedTranscript-model";
import { SavedTranscriptValidation } from "../validations/savedTrasncript-validation";
import { Validation } from "../validations/validation";

export class SavedTranscriptService {
    static async create(request: CreateSavedTranscript): Promise<SavedTranscriptResponse> {
        const createRequest = Validation.validate(SavedTranscriptValidation.CREATE, request);

        const savedTranscript = await prismaClient.savedTranscript.create({
            data: createRequest
        });

        return savedTranscript;
    }

    static async getById(id: number): Promise<SavedTranscriptResponse | null> {
        const savedTranscript = await prismaClient.savedTranscript.findUnique({
            where: { id }
        });

        if (!savedTranscript) {
            throw new ResponseError(404, "Transcript not found");
        }

        return savedTranscript;
    }

    static async update(id: number, request: CreateSavedTranscript): Promise<SavedTranscriptResponse> {
        const updateRequest = Validation.validate(SavedTranscriptValidation.CREATE, request);

        const savedTranscript = await prismaClient.savedTranscript.update({
            where: { id },
            data: updateRequest
        });

        return savedTranscript;
    }

    static async delete(id: number): Promise<void> {
        await prismaClient.savedTranscript.delete({
            where: { id }
        });
    }

    static async getAllByUserId(userId: number): Promise<SavedTranscriptResponse[]> {
        const savedTranscripts = await prismaClient.savedTranscript.findMany({
            where: { user_id: userId }
        });

        return savedTranscripts;
    }
}