import { NextFunction, Response, Request } from "express"
import { CreateTopicRequest, CreateVideoRequest, TopicResponse, VideoResponse } from "../models/study-model";
import { StudyService } from "../services/study-service"

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
}