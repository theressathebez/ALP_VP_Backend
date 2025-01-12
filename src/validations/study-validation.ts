import { z, ZodType } from "zod";

export class StudyValidation {
    static readonly CREATE_TOPIC: ZodType = z.object({
        topicName: z.string().min(1).max(100),
        categoryId: z.number().positive(),
    })

    static readonly CREATE_CATEGORY: ZodType = z.object({
        name: z.string().min(1).max(50)
    });    

    static readonly CREATE_VIDEO: ZodType = z.object({
        videoName: z.string().min(1).max(100),
        videoUrl: z
            .string()
            .url("Invalid URL format.")
            .max(200),
        flashcard: z.string().min(1).max(100).optional(),
        topicId: z.number().positive(),
    })

    static readonly UPDATE_TOPIC: ZodType = z.object({
        topicName: z.string().min(1).max(100).optional()
    }).partial();

    static readonly UPDATE_VIDEO: ZodType = z.object({
        videoName: z.string().min(1).max(100).optional(),
        videoUrl: z
            .string()
            .url("Invalid URL format.")
            .max(200)
            .optional(),
        flashcard: z.string().min(1).max(100).optional(),
        topicId: z.number().positive().optional(),
    }).partial();
}

