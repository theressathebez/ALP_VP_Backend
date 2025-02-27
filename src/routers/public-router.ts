import express from "express"
import { UserController } from "../controllers/user-controller";
import { StudyController } from "../controllers/study-controller";

export const publicRouter = express.Router()

publicRouter.post("/api/register", UserController.register)
publicRouter.post("/api/login", UserController.login)

//study

publicRouter.post("/api/categories", StudyController.createCategory);
publicRouter.get("/api/categories", StudyController.getCategories);

publicRouter.get("/api/categories/:categoryId/topics", StudyController.getTopicsByCategory);
publicRouter.post("/api/addTopic", StudyController.addTopic)
publicRouter.put("/api/topics/:topicId", StudyController.updateTopic);

publicRouter.get("/api/video/:videoId", StudyController.getVideo);
publicRouter.post("/api/addVideo", StudyController.createVideo)
publicRouter.get("/api/getVideos/:topicId", StudyController.getVideosByTopic);
publicRouter.delete("/api/videos/:videoId", StudyController.deleteVideo);
publicRouter.put("/api/videos/:videoId", StudyController.updateVideo);