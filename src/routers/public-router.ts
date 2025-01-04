import express from "express"
import { StudyController } from "../controllers/study-controller"
import { UserController } from "../controllers/user-controller";

export const publicRouter = express.Router()

publicRouter.post("/api/register", UserController.register)
publicRouter.post("/api/login", UserController.login)

// publicRouter.post("/api/registerUser", AuthController.registerUser)
// publicRouter.post("/api/addMK", MataKuliahController.addMK)
// publicRouter.get("/api/getAllMK", MataKuliahController.getAllMK)
// publicRouter.delete("/api/deleteMK", MataKuliahController.deleteMKById)
// publicRouter.put("/api/updateMK", MataKuliahController.updateMKById)
