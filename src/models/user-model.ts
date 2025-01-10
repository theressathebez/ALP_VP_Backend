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

export interface UpdateUser {
    id: number
    email: string
    username: string
    password: string
}

export interface ChangeUserResponse {
    password: string
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

export function toChangeUserResponse(prismaUser: User): ChangeUserResponse {
    return {
        password: prismaUser.password
    }
}

