import { prismaClient } from "../application/database";
import { ResponseError } from "../errors/response-error";
import { LoginUser, RegisterUser } from "../models/user-model";
import { UserValidation } from "../validations/user-validation";
import { Validation } from "../validations/validation";
import bcrypt from "bcrypt"


export class UserService {
    static async register(request: RegisterUser) {
        const registerRequest = Validation.validate(
            UserValidation.REGISTER,
            request
        )

        const email = await prismaClient.user.findFirst({
            where: {
                email: registerRequest.email
            }
        })

        if (email) {
            throw new ResponseError(400, "Email already exists!")
        }

        registerRequest.password = await bcrypt.hash(
            registerRequest.password,
            10
        )

        const user = await prismaClient.user.create({
            data: {
                email: registerRequest.email,
                username: registerRequest.username,
                password: registerRequest.password
            }
        })
    }

    static async login(request: LoginUser) {
        const loginRequest = Validation.validate(
            UserValidation.LOGIN, 
            request)

        let user = await prismaClient.user.findFirst({
            where: {
                email: loginRequest.email,
            },
        })

        if (!user) {
            throw new ResponseError(400, "Invalid email or password!")
        }

        const passwordIsValid = await bcrypt.compare(
            loginRequest.password,
            user.password
        )

        if (!passwordIsValid) {
            throw new ResponseError(400, "Invalid email or password!")
        }

    }
}