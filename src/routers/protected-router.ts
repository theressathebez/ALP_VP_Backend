import express from "express"
import { authMiddleware } from "../middlewares/auth-middleware"
import { StudyController } from "../controllers/study-controller"
import { UserController } from "../controllers/user-controller"
import { SavedTranscriptController } from "../controllers/savedTranscript-controller"

export const protectedRouter = express.Router()
protectedRouter.use(authMiddleware)

protectedRouter.post("/api/logout", UserController.logout)
// protectedRouter.delete("/api/logout", AuthController.logout)

//user
protectedRouter.post("/api/users/:userId/videos/:videoId", UserController.saveVideo);
protectedRouter.get("/api/users/:userId/videos", UserController.getUserVideos)
protectedRouter.delete("/api/users/:userId/videos/:videoId", UserController.deleteUserVideo);

//study
protectedRouter.post("/api/addTopic", StudyController.addTopic)
protectedRouter.post("/api/addVideo", StudyController.createVideo)
protectedRouter.get("/api/getTopic", StudyController.getTopics)
protectedRouter.get("/api/getVideos/:topicId", StudyController.getVideosByTopic);
protectedRouter.delete("/api/videos/:videoId", StudyController.deleteVideo);
protectedRouter.put("/api/topics/:topicId", StudyController.updateTopic);
protectedRouter.put("/api/videos/:videoId", StudyController.updateVideo);

//transcript
protectedRouter.post("/api/savedTranscripts", SavedTranscriptController.create);
protectedRouter.get("/api/savedTranscripts/:id", SavedTranscriptController.getById);
protectedRouter.put("/api/savedTranscripts/:id", SavedTranscriptController.update);
protectedRouter.delete("/api/savedTranscripts/:id", SavedTranscriptController.delete);
protectedRouter.get("/api/users/savedTranscripts", SavedTranscriptController.getAllByUserId);
