import { SavedTranscript } from "@prisma/client";

export interface CreateSavedTranscript {
    transcript_text: string;
    user_id: number;
}

export interface SavedTranscriptResponse {
    id: number;
    transcript_text: string;
    user_id: number;
}