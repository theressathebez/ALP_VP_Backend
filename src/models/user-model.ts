import { User } from "@prisma/client";

export interface RegisterUser {
    email: string
    username: string
    password: string
}

export interface LoginUser {
    id: number
    email: string
    username: string
    password: string
}

