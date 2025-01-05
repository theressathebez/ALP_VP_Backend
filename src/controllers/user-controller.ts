import { NextFunction, Request, Response } from "express";
import { LoginUser, RegisterUser, UserResponse } from "../models/user-model";
import { UserService } from "../services/user-service";
import { UserRequest } from "../type/user-request";

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
}