import { z, ZodType } from "zod";

export class StudyValidation {
    static readonly CREATE: ZodType = z.object({
        nama: z.string().min(1).max(100),
        nim: z.string().min(4).max(4),
        mataKuliahId: z.number().positive()
    })
}

