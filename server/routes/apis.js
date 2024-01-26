const express = require("express");
const router = express.Router();
const Task = require("../model/Task");

// Get all tasks
router.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new task
router.post("/tasks", async (req, res) => {
    const task = new Task({
        title: req.body.title,
    });

    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
