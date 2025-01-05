import { Video } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ResponseError } from "../errors/response-error";
import { LoginUser, RegisterUser, toUserResponse, UserResponse } from "../models/user-model";
import { UserValidation } from "../validations/user-validation";
import { Validation } from "../validations/validation";
import bcrypt from "bcrypt"


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
                password: registerRequest.password
            }
        })

        return toUserResponse(user)
    }

    static async login(request: LoginUser): Promise<string> {
        const loginRequest = Validation.validate(
            UserValidation.LOGIN,
            request)

        let user = await prismaClient.user.findFirst({
            where: {
                email: loginRequest.email,
            }
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

        return "Login Successfully!"
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