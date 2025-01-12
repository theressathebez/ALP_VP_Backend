import { User } from "@prisma/client";
import { Video } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ResponseError } from "../errors/response-error";
import { ChangeUserResponse, LoginUser, RegisterUser, toChangeUserResponse, toUserResponse, UpdateUser, UserResponse } from "../models/user-model";
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

    static async checkUserIsEmpty(
        userId: number
    ): Promise<User> {
        const user = await prismaClient.user.findUnique({
            where: {
                id: userId
            },
        })

        if (!user) {
            throw new ResponseError(400, "User not found!")
        }

        return user
    }

    static async updateUser(request: UpdateUser): Promise<ChangeUserResponse> {
        const updateRequest = Validation.validate(
            UserValidation.UPDATE, 
            request)

        updateRequest.password = await bcrypt.hash(
            updateRequest.password,
            10
        )

        const userUpdate = await prismaClient.user.update({
            where: {
                id: updateRequest.id
            },
            data: updateRequest
        })

        const response = toChangeUserResponse(userUpdate)

        return response
}

    static async deleteUser(user: User): Promise<String> {
        const users = await prismaClient.user.findUnique({
            where: {
                id: user.id
            },
        })

        if (!users) {
            throw new ResponseError(400, "User not found!")
        }

        await prismaClient.user.delete({
            where: {
                id: user.id
            }
        })

        return "Account deleted successfully!"
    }

    static async saveVideoToUser(userId: number, videoId: number): Promise<void> {
        // Memeriksa apakah video ada dalam database
        const video = await prismaClient.video.findUnique({
            where: { id: videoId }
        });

        if (!video) {
            throw new ResponseError(404, "Video not found");
        }

        // Memeriksa apakah video sudah disimpan oleh pengguna
        const existingUserVideo = await prismaClient.userVideo.findUnique({
            where: { user_id_video_id: { user_id: userId, video_id: videoId } }
        });

        if (existingUserVideo) {
            throw new ResponseError(400, "Video already saved");
        }

        // Menyimpan video ke tabel UserVideo
        await prismaClient.userVideo.create({
            data: {
                user_id: userId,
                video_id: videoId
            }
        });
    }

    static async getUserVideos(userId: number): Promise<Video[]> {
        const userVideos = await prismaClient.userVideo.findMany({
            where: { user_id: userId },
            include: {
                video: true
            }
        });

        return userVideos.map((userVideo) => userVideo.video);
    }

    static async deleteUserVideo(userId: number, videoId: number): Promise<string> {
        // Periksa apakah user-video tersebut ada
        const userVideo = await prismaClient.userVideo.findFirst({
            where: {
                user_id: userId,
                video_id: videoId,
            },
        });

        if (!userVideo) {
            throw new ResponseError(404, "Video not found for this user!");
        }

        // Hapus video dari tabel userVideo
        await prismaClient.userVideo.delete({
            where: {
                id: userVideo.id,
            },
        });

        return "Video successfully deleted!";
    }
}