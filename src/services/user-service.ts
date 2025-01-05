import { User } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ResponseError } from "../errors/response-error";
import { LoginUser, RegisterUser, toUserResponse, UserResponse } from "../models/user-model";
import { UserValidation } from "../validations/user-validation";
import { Validation } from "../validations/validation";
import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid";


export class UserService {
    static async register(request: RegisterUser): Promise<UserResponse> {
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
                password: registerRequest.password,
                token: uuid()
            }
        })

        return toUserResponse(user)
    }

    static async login(request: LoginUser): Promise<UserResponse> {
        const loginRequest = Validation.validate(
            UserValidation.LOGIN, 
            request)

        let user = await prismaClient.user.findFirst({
            where: {
                email: loginRequest.email,
            }
        })

        if (!user) {
            throw new ResponseError(400, "Invalid email!")
        }

        const passwordIsValid = await bcrypt.compare(
            loginRequest.password,
            user.password
        )

        if (!passwordIsValid) {
            throw new ResponseError(400, "Invalid password!")
        }

        user = await prismaClient.user.update({
            where: {
                id: user.id,
            },
            data: {
                token: uuid(),
            },
        })

        const response = toUserResponse(user)

        return response
    }

    static async logout(user: User): Promise<string> {
            const result = await prismaClient.user.update({
                where: {
                    id: user.id
                },
                data: {
                    token: null
                }
            })

        return "Logout Successfully!"
    }
}