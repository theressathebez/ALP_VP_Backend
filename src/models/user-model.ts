import { User } from "@prisma/client";

export interface RegisterUser {
    email: string
    username: string
    password: string
}

export interface UserResponse {
    token?: string
    username: string
}

export interface LoginUser {
    email: string
    password: string
}

export function toUserResponse(prismaUser: User): UserResponse {
    return {
        token: prismaUser.token ?? "",
        username: prismaUser.username
    }
    
}

