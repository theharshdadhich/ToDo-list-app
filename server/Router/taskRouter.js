import express from "express";
import auth from "../middleware/auth.js"; // Auth middleware to protect routes
import { createTask, markTasksAsExpired,findTaskById, getTasks, updateTask ,deleteTask,updateTaskStatus} from "../Controllers/task.controller.js";
// findTaskById
const TaskRouter = express.Router();

TaskRouter.post("/create", auth, createTask);

TaskRouter.get("/tasks", auth, getTasks);
TaskRouter.put("/updateTaskStatus/:id", auth,updateTaskStatus);
TaskRouter.get("", auth, findTaskById);
TaskRouter.get('/auto-expire',auth, markTasksAsExpired);
TaskRouter.put("/update/:id", auth, updateTask);


TaskRouter.delete("/delete/:id", auth, deleteTask);

export default TaskRouter;
