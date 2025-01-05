import express from "express"
// import { authMiddleware } from "../middlewares/auth-middleware"
import { StudyController } from "../controllers/study-controller"

export const protectedRouter = express.Router()
// protectedRouter.use(authMiddleware)

// protectedRouter.delete("/api/logout", AuthController.logout)
protectedRouter.post("/api/addTopic", StudyController.addTopic)
protectedRouter.post("/api/addVideo", StudyController.createVideo)
protectedRouter.get("/api/getTopic", StudyController.getTopics)
protectedRouter.get("/api/getVideos/:topicId", StudyController.getVideosByTopic);
protectedRouter.delete("/api/videos/:videoId", StudyController.deleteVideo);
protectedRouter.put("/api/videos/:videoId", StudyController.updateVideo);

// protectedRouter.get("/api/todo/:todoId", TodoController.getTodo)
// protectedRouter.put("/api/todo/:todoId", TodoController.updateTodo)
// protectedRouter.delete("/api/todo/:todoId", TodoController.deleteTodo)