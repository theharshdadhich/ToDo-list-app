import mongoose from "mongoose";
import TaskModal from "../Modals/TaskSchema.js";


export const createTask = async (req, res) => {
  const { title, description, deadline } = req.body;
  const userId = req.userId;

  try {
    // Input validation
    if (!title || !description) {
      return res.status(400).json({ msg: "Title and description are required" });
    }

    const deadlineDate = new Date(deadline);
    if (isNaN(deadlineDate.getTime())) {
      return res.status(400).json({ msg: "Invalid deadline date" });
    }
    if (deadlineDate <= new Date()) {
      return res.status(400).json({ msg: "Deadline must be a future date" });
    }

    // Create and save task
    const task = new TaskModal({
      title,
      description,
      deadline: deadlineDate,
      user: userId,
      createdAt: new Date(),
    });

    await task.save();
    res.status(201).json({
      msg: "Task created successfully",
      task,
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Error creating Task:", error);
    res.status(500).json({
      msg: "Server error while creating Task",
      error: error.message,
    });
  }
};

export const markTasksAsExpired = async (req, res) => {
  const userId = req.userId;

  try {
    console.log('User ID:', userId);
    console.log('Current date:', new Date());

    const tasksToExpire = await TaskModal.find({
      user: userId,
      deadline: { $lt: new Date() },
      status: { $ne: "EXPIRED", $ne: "COMPLETE" },  // Exclude completed tasks
    });

    console.log('Tasks to expire:', tasksToExpire);

    const result = await TaskModal.updateMany(
      { 
        user: userId, 
        deadline: { $lt: new Date() }, 
        status: { $ne: "EXPIRED", $ne: "COMPLETE" }  // Exclude completed tasks
      },
      { $set: { status: "EXPIRED" } }
    );

    if (result.modifiedCount === 0) {
      return res.status(200).json({
        message: "No expired tasks found or already marked as expired.",
        success: true,
        count: 0,
      });
    }

    res.status(200).json({
      message: "Auto-expired tasks updated for user.",
      count: result.modifiedCount,
      success: true,
    });
  } catch (error) {
    console.error("Error auto-expiring tasks:", error);
    res.status(500).json({
      msg: "Server error while finding Task",
      success: false,
      error: true,
      errorMessage: error.message,
    });
  }
};






export const getTasks = async (req, res) => {
  try {
    const { status, sortBy } = req.query;
    const userId = req.userId
    let query = { user: userId };
    if (status) query.status = status;

    let sort = {};
    if (sortBy === "deadline") sort.deadline = 1; 

    const TaskModals = await TaskModal.find(query).sort(sort);
    res.status(200).json({ TaskModals });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error while fetching TaskModals" });
  }
};

export const updateTask = async (req, res) => {
  const { title, description, status, deadline } = req.body;

  try {
    let task = await TaskModal.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "TaskModal not found" });
    }

    // Update TaskModal fields
    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;

    // If the deadline is updated, make sure to update it
    if (deadline) {
      const deadlineDate = new Date(deadline);
      if (isNaN(deadlineDate)) {
        return res.status(400).json({ msg: "Invalid deadline date" });
      }
      task.deadline = deadlineDate;
    }

    // Save the updated TaskModal to the database
    await task.save();
    res.status(200).json({ TaskModal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error while updating TaskModal" });
  }
};


export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id; 
    const task = await TaskModal.findByIdAndDelete({_id:taskId});

    if (!task) {
      return res.status(404).json({ msg: "Task not found", success: false, error: true });
    }

    res.status(200).json({ msg: "Task deleted successfully", success: true, error: false });
  } catch (error) {
    console.error("Error while deleting Task:", error);
    res.status(500).json({ msg: "Server error while deleting Task", success: false, error: true });
  }
};

export const findTaskById = async (req, res) => {
  const {id} = req.query; // Get the task ID from the request parameters
  const userId = req.userId; // Get the authenticated user's ID from the request

  try {
    // Find the task by ID and check if it belongs to the authenticated user
    const task = await TaskModal.findOne({ _id: id, user: userId });

    if (!task) {
      return res.status(404).json({ 
        msg: "Task not found or you do not have permission to access it", 
        success: false, 
        error: true 
      });
    }

    res.status(200).json({ 
      msg: "Task retrieved successfully", 
      task, 
      success: true, 
      error: false 
    });
  } catch (error) {
    console.error("Error while finding Task:", error);
    res.status(500).json({ 
      msg: "Server error while finding Task", 
      success: false, 
      error: true 
    });
  }
};


export const updateTaskStatus = async (req, res) => {
  const taskId = req.params.id;
  const { status } = req.body; 
  const userId = req.userId;

  try {
    const task = await TaskModal.findOne({ _id: taskId, user: userId });

    if (!task) {
      return res.status(404).json({ 
        msg: "Task not found or you do not have permission to update it", 
        success: false, 
        error: true 
      });
    }

    task.status = status;

    await task.save();

    res.status(200).json({ 
      msg: "Task status updated successfully", 
      task, 
      success: true, 
      error: false 
    });
  } catch (error) {
    console.error("Error while updating task status:", error);
    res.status(500).json({ 
      msg: "Server error while updating task status", 
      success: false, 
      error: true 
    });
  }
};