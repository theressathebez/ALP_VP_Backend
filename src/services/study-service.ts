import { prismaClient } from "../application/database";
import { ResponseError } from "../errors/response-error";
import { CreateTopicRequest, CreateVideoRequest, TopicResponse, toTopicResponse, toVideoResponse, VideoResponse } from "../models/study-model";
import { StudyValidation } from "../validations/study-validation";
import { Validation } from "../validations/validation";

export class StudyService {

    static async createTopic(req: CreateTopicRequest): Promise<TopicResponse> {
        //validate request
        const validRequest = Validation.validate(
            StudyValidation.CREATE_TOPIC,
            req
        )

        // Simpan ke database
        const topic = await prismaClient.topic.create({
            data: { topic_name: validRequest.topicName },
        });

        return toTopicResponse(topic);
    }

    static async createVideo(request: CreateVideoRequest): Promise<VideoResponse> {
        // Validasi request
        const validRequest = Validation.validate(StudyValidation.CREATE_VIDEO, request);

        // Simpan ke database
        const video = await prismaClient.video.create({
            data: {
                video_name: validRequest.videoName,
                video_url: validRequest.videoUrl,
                flashcard: validRequest.flashcard || "",
                topic_id: validRequest.topicId,
            },
        });

        return toVideoResponse(video);
    }

    static async getTopics(): Promise<TopicResponse[]> {
        const topics = await prismaClient.topic.findMany(); 
        
        return topics.map(toTopicResponse); 
    }
    
}