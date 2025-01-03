import express from "express"
// import { authMiddleware } from "../middlewares/auth-middleware"
import { StudyController } from "../controllers/study-controller"

export const protectedRouter = express.Router()
// protectedRouter.use(authMiddleware)

// protectedRouter.delete("/api/logout", AuthController.logout)
// protectedRouter.post("/api/todo", TodoController.createTodo)
// protectedRouter.get("/api/todo", TodoController.getAllTodos)
// protectedRouter.get("/api/todo/:todoId", TodoController.getTodo)
// protectedRouter.put("/api/todo/:todoId", TodoController.updateTodo)
// protectedRouter.delete("/api/todo/:todoId", TodoController.deleteTodo)