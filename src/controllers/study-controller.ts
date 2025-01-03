import { NextFunction, Response, Request } from "express"
import { RegisterUserRequest, UserResponse } from "../models/study-model"
import { StudyService } from "../services/study-service"

export class StudyController {
    static async registerUser(req: Request, res: Response, next: NextFunction) {
        // try {
        //     const request: RegisterUserRequest = req.body as RegisterUserRequest
        //     const response: UserResponse = await UserService.register(request)

        //     res.status(200).json({
        //         data: response,
        //     })
        // } catch (error) {
        //     //ini pass error ke middleware
        //     next(error);
        // }
    }
}