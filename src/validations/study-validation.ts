import { z, ZodType } from "zod";

export class StudyValidation {
    static readonly CREATE_TOPIC: ZodType = z.object({
        topicName: z.string().min(1).max(100)
    })

    static readonly CREATE_VIDEO: ZodType = z.object({
        videoName: z.string().min(1).max(100),
        videoUrl: z
            .string()
            .url("Invalid URL format.")
            .max(200),
        flashcard: z.string().optional(), 
        topicId: z.number().positive(),
    })
}

