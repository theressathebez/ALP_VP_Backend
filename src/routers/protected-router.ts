import express from "express"
import { authMiddleware } from "../middlewares/auth-middleware"
import { StudyController } from "../controllers/study-controller"
import { UserController } from "../controllers/user-controller"
import { SavedTranscriptController } from "../controllers/savedTranscript-controller"

export const protectedRouter = express.Router()
protectedRouter.use(authMiddleware)

protectedRouter.post("/api/logout", UserController.logout)

//user
protectedRouter.post("/api/users/:userId/videos/:videoId", UserController.saveVideo);
protectedRouter.get("/api/users/:userId/videos", UserController.getUserVideos)
protectedRouter.delete("/api/users/:userId/videos/:videoId", UserController.deleteUserVideo);
protectedRouter.put("/api/update-user", UserController.updateUser)
protectedRouter.delete("/api/delete-user", UserController.deleteUser)

//transcript
protectedRouter.post("/api/savedTranscripts", SavedTranscriptController.create);
protectedRouter.get("/api/savedTranscripts/:id", SavedTranscriptController.getById);
protectedRouter.put("/api/savedTranscripts/:id", SavedTranscriptController.update);
protectedRouter.delete("/api/savedTranscripts/:id", SavedTranscriptController.delete);
protectedRouter.get("/api/users/savedTranscripts", SavedTranscriptController.getAllByUserId);
