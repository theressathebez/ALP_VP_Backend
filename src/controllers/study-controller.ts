import { NextFunction, Response, Request } from "express"
import { CreateTopicRequest, CreateVideoRequest, TopicResponse, VideoResponse } from "../models/study-model";
import { StudyService } from "../services/study-service"
import { ResponseError } from "../errors/response-error";

export class StudyController {
    static async addTopic(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateTopicRequest = req.body as CreateTopicRequest; // Parse request body
            const response: TopicResponse = await StudyService.createTopic(request); // Call the service function
            res.status(201).json({ data: response }); // Send response
        } catch (error) {
            next(error); // Pass error to middleware
        }
    }

    static async createVideo(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateVideoRequest = req.body as CreateVideoRequest; // Parse request body
            const response: VideoResponse = await StudyService.createVideo(request); // Call the service function
            res.status(201).json({ data: response }); // Send response
        } catch (error) {
            next(error); // Pass error to middleware
        }
    }

    static async getTopics(req: Request, res: Response, next: NextFunction) {
        try {
            const topics = await StudyService.getTopics(); // Retrieve topics using service
            res.status(200).json({ data: topics }); // Send response
        } catch (error) {
            next(error); // Pass error to middleware
        }
    }

    static async getVideosByTopic(req: Request, res: Response, next: NextFunction) {
        try {
            const topicId = parseInt(req.params.topicId); // Ambil topicId dari parameter URL
            if (isNaN(topicId)) {
                throw new Error("Invalid topic ID");
            }

            const videos = await StudyService.getVideosByTopic(topicId); // Panggil service
            res.status(200).json({ data: videos }); // Kirimkan response
        } catch (error) {
            next(error); // Pass error ke middleware
        }
    }

    static async deleteVideo(req: Request, res: Response, next: NextFunction) {
        try {
            const videoId = parseInt(req.params.videoId); // Parse video ID dari URL
            await StudyService.deleteVideo(videoId); // Panggil service untuk hapus video
            res.status(200).json({ message: "Video deleted successfully" }); // Kirim response
        } catch (error) {
            next(error); // Pass error ke middleware
        }
    }

    static async updateVideo(req: Request, res: Response, next: NextFunction) {
        try {
            const videoId = parseInt(req.params.videoId); // Parse video ID dari URL
            const request: CreateVideoRequest = req.body; // Parse body untuk data update

            if (isNaN(videoId)) {
                throw new ResponseError(400, "Invalid video ID");
            }

            const response = await StudyService.updateVideo(videoId, request);

            res.status(200).json({
                message: `Video dengan ID ${videoId} berhasil diperbarui.`,
                data: response,
            });
        } catch (error) {
            next(error); // Pass error ke middleware
        }
    }

}