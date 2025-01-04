import { Request, Response } from "express";
import { LoginUser, RegisterUser } from "../models/user-model";
import { UserService } from "../services/user-service";

export class UserController {
    static async register(req: Request, res: Response) {
        try {
            const request: RegisterUser = req.body as RegisterUser
            const response = await UserService.register(request)

            res.status(200).json({
                data: response
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const request = req.body as LoginUser
            const response = await UserService.login(request)

            res.status(200).json({
                data: response
            })
        } catch (error) {
            console.log(error)
        }
    }
}