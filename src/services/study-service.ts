import { prismaClient } from "../application/database";
import { ResponseError } from "../errors/response-error";
// import { RegisterUserRequest, toUserResponse, UserResponse } from "../models/study-model";
import { StudyValidation } from "../validations/study-validation";
import { Validation } from "../validations/validation";

export class StudyService {

    // static async register(req: RegisterUserRequest): Promise<UserResponse> {
    //     //validate request
    //     const registerReq = Validation.validate(
    //         StudyValidation.CREATE,
    //         req
    //     )

    //     //error handling
    //     const existingUser = await prismaClient.mahasiswa.findUnique({
    //         where: { nim: registerReq.nim },
    //     });
    //     if (existingUser) {
    //         throw new ResponseError(409, `User with NIM ${registerReq.nim} already exists.`);
    //     }

    //     const mahasiswa = await prismaClient.mahasiswa.create({
    //         data: {
    //             nama: registerReq.nama,
    //             nim: registerReq.nim,
    //             mataKuliahId: registerReq.mataKuliahId
    //         }
    //     })

    //     return toUserResponse(mahasiswa)
    // }
}