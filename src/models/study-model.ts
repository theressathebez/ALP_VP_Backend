import { User } from "@prisma/client"

export interface RegisterUserRequest {
    nama: string
    nim: string
    mataKuliahId: number
}

export interface UserResponse {
    nama: string
    nim: string
}

// export function toUserResponse(mahasiswa: Mahasiswa) {
//     return {
//         nama: mahasiswa.nama,
//         nim: mahasiswa.nim,
//         mataKuliahId: mahasiswa.mataKuliahId
//     }
// }