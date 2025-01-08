import { prismaClient } from "../application/database";
import { ResponseError } from "../errors/response-error";
import { CategoryResponse, CreateCategoryRequest, CreateTopicRequest, CreateVideoRequest, toCategoryResponse, TopicResponse, toTopicResponse, toVideoResponse, VideoResponse } from "../models/study-model";
import { StudyValidation } from "../validations/study-validation";
import { Validation } from "../validations/validation";

export class StudyService {

    static async createCategory(request: CreateCategoryRequest): Promise<CategoryResponse> {
        // Validate the request
        Validation.validate(StudyValidation.CREATE_CATEGORY, request);

        // Create the category in the database
        const category = await prismaClient.category.create({
            data: {
                name: request.name,
            },
        });

        return toCategoryResponse(category);
    }

    static async createTopic(req: CreateTopicRequest): Promise<TopicResponse> {
        //validate request
        const validRequest = Validation.validate(
            StudyValidation.CREATE_TOPIC,
            req
        )

        // Simpan ke database
        const topic = await prismaClient.topic.create({
            data: {
                topic_name: validRequest.topicName,
                categoryId: validRequest.categoryId,
            },
        });

        return toTopicResponse(topic);
    }

    static async createVideo(req: CreateVideoRequest): Promise<VideoResponse> {
        // Validasi request
        const validRequest = Validation.validate(StudyValidation.CREATE_VIDEO, req);

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

    static async getTopicsByCategory(categoryId: number): Promise<TopicResponse[]> {
        // Find topics related to the specified category
        const topics = await prismaClient.topic.findMany({
            where: {
                categoryId: categoryId, // Filter by categoryId
            },
        });

        return topics.map(toTopicResponse);
    }

    static async getCategories(): Promise<CategoryResponse[]> {
        const categories = await prismaClient.category.findMany();

        return categories.map(toCategoryResponse);
    }

    static async getVideosByTopic(topicId: number): Promise<VideoResponse[]> {
        // Cari video berdasarkan topicId
        const videos = await prismaClient.video.findMany({
            where: {
                topic_id: topicId,
            },
        });

        return videos.map(toVideoResponse);
    }

    static async getVideo(videoId: number): Promise<VideoResponse> {
        const video = await prismaClient.video.findUnique({
            where: { id: videoId },
        });

        if (!video) {
            throw new ResponseError(404, "Video not found");
        }

        return toVideoResponse(video);
    }

    static async deleteVideo(videoId: number): Promise<void> {
        const video = await prismaClient.video.findUnique({ where: { id: videoId } });
        if (!video) {
            throw new ResponseError(404, "Video not found");
        }
        await prismaClient.video.delete({ where: { id: videoId } });
    }

    static async updateTopic(topicId: number, req: CreateTopicRequest): Promise<TopicResponse> {
        //partial() agar semua properti di validasi jadi opsional, jadi ga perlu kirim semua datanya
        const updateReq = Validation.validate(
            StudyValidation.UPDATE_TOPIC,
            req
        );

        // Cari topic berdasarkan ID
        const topic = await prismaClient.topic.findUnique({
            where: { id: topicId }
        });

        if (!topic) {
            throw new ResponseError(404, "Topic not found");
        }

        const updatedTopic = await prismaClient.topic.update({
            where: { id: topicId },
            data: {
                topic_name: updateReq.topicName ?? topic.topic_name
            },
        });

        return toTopicResponse(updatedTopic);
    }

    static async updateVideo(videoId: number, req: CreateVideoRequest): Promise<VideoResponse> {
        //partial() agar semua properti di validasi jadi opsional, jadi ga perlu kirim semua datanya
        const updateReq = Validation.validate(
            StudyValidation.UPDATE_VIDEO,
            req
        );

        const video = await prismaClient.video.findUnique({
            where: { id: videoId }
        });

        if (!video) {
            throw new ResponseError(404, "Video not found");
        }

        const updatedVideo = await prismaClient.video.update({
            where: { id: videoId },
            data: {
                video_name: updateReq.videoName ?? video.video_name,
                video_url: updateReq.videoUrl ?? video.video_url,
                flashcard: updateReq.flashcard ?? video.flashcard,
                topic_id: updateReq.topicId ?? video.topic_id,
            },
        });

        return toVideoResponse(updatedVideo);
    }

}