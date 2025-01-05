import { z, ZodType } from "zod";

export class SavedTranscriptValidation {
    static readonly CREATE: ZodType = z.object({
        transcript_text: z.string(),
        user_id: z.number().positive()
    })
}