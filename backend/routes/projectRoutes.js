const express = require("express");
const Project = require("../models/Project");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const project = await Project.create({
            ...req.body,
            createdBy: req.user.id
        });
        res.json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;