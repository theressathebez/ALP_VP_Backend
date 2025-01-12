import { NextFunction, Request, Response } from "express";
import { LoginUser, RegisterUser, UpdateUser, UserResponse } from "../models/user-model";
import { UserService } from "../services/user-service";
import { UserRequest } from "../type/user-request";
import { request } from "http";

export class UserController {
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const request: RegisterUser = req.body as RegisterUser
            const response: UserResponse = await UserService.register(request)

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const request = req.body as LoginUser
            const response = await UserService.login(request)

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    
    static async logout(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await UserService.logout(req.user!)

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async updateUser(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request = req.body as UpdateUser
            const response = await UserService.updateUser(request)

            res.status(201).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async deleteUser(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await UserService.deleteUser(req.user!)

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async saveVideo(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = parseInt(req.params.userId); // Menyesuaikan ID pengguna yang login
            const videoId = parseInt(req.params.videoId); // ID video yang disimpan
            await UserService.saveVideoToUser(userId, videoId);
            res.status(200).json({ message: "Video saved successfully" });
        } catch (error) {
            next(error);
        }
    }

    static async getUserVideos(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = parseInt(req.params.userId);
            const videos = await UserService.getUserVideos(userId);
            res.status(200).json({ data: videos });
        } catch (error) {
            next(error);
        }
    }

    static async deleteUserVideo(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = parseInt(req.params.userId);
            const videoId = parseInt(req.params.videoId);

            if (isNaN(userId) || isNaN(videoId)) {
                res.status(400).json({ message: "Invalid userId or videoId" });
                return;
            }

            const response = await UserService.deleteUserVideo(userId, videoId);

            res.status(200).json({
                message: response,
            });
        } catch (error) {
            next(error);
        }
    }
}