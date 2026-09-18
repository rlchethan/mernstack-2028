// ===============================
// LOAD ENVIRONMENT VARIABLES
// ===============================

require("dotenv").config();


// ===============================
// DNS CONFIGURATION
// ===============================

const dns = require("dns");

dns.setServers(["8.8.8.8"]);


// ===============================
// IMPORTS
// ===============================

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Task = require("./models/Task.js");
const User = require("./models/User.js");


// ===============================
// CREATE EXPRESS APP
// ===============================

const app = express();


// ===============================
// MIDDLEWARE
// ===============================

app.use(cors());
app.use(express.json());


// ===============================
// MONGODB CONNECTION
// ===============================

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("MongoDB Connected Successfully!");
    })
    .catch((error) => {
        console.log(
            "MongoDB Connection Failed:",
            error.message
        );
    });


// ===============================
// TEST BACKEND
// ===============================

app.get("/", (req, res) => {
    res.send("Backend is Working!!");
});


// ===============================
// GET ALL TASKS
// ===============================

app.get("/api/tasks", async (req, res) => {
    try {
        const tasks = await Task.find();

        res.status(200).json(tasks);

    } catch (error) {
        console.log(
            "Error fetching tasks:",
            error.message
        );

        res.status(500).json({
            message: "Failed to fetch tasks"
        });
    }
});


// ===============================
// GET ONE TASK
// ===============================

app.get("/api/tasks/:id", async (req, res) => {
    try {
        const taskData = await Task.findById(
            req.params.id
        );

        if (!taskData) {
            return res.status(404).json({
                message: "Task not found!"
            });
        }

        res.status(200).json(taskData);

    } catch (error) {
        console.log(
            "Error fetching task:",
            error.message
        );

        res.status(500).json({
            message: "Invalid Task ID"
        });
    }
});


// ===============================
// ADD NEW TASK
// ===============================

app.post("/api/tasks", async (req, res) => {
    try {
        const {
            title,
            description,
            status
        } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                message:
                    "Title and description are required"
            });
        }

        const newTask = new Task({
            title: title,
            description: description,
            status: status || "Pending"
        });

        const savedTask = await newTask.save();

        console.log(
            "New Task Added:",
            savedTask
        );

        res.status(201).json(savedTask);

    } catch (error) {
        console.log(
            "Error adding task:",
            error.message
        );

        res.status(500).json({
            message: "Failed to add task"
        });
    }
});


// ===============================
// CHANGE TASK STATUS
// ===============================

app.put("/api/tasks/:id", async (req, res) => {
    try {
        const updatedTask =
            await Task.findByIdAndUpdate(
                req.params.id,
                {
                    status: req.body.status
                },
                {
                    new: true,
                    runValidators: true
                }
            );

        if (!updatedTask) {
            return res.status(404).json({
                message: "Task Not Found"
            });
        }

        console.log(
            "Task Updated:",
            updatedTask
        );

        res.status(200).json(updatedTask);

    } catch (error) {
        console.log(
            "Error updating task:",
            error.message
        );

        res.status(500).json({
            message: "Failed to update task"
        });
    }
});


// ===============================
// DELETE TASK
// ===============================

app.delete("/api/tasks/:id", async (req, res) => {
    try {
        const deletedTask =
            await Task.findByIdAndDelete(
                req.params.id
            );

        if (!deletedTask) {
            return res.status(404).json({
                message: "Task Not Found"
            });
        }

        console.log(
            "Task Deleted:",
            deletedTask
        );

        res.status(200).json({
            message: "Task Deleted Successfully",
            task: deletedTask
        });

    } catch (error) {
        console.log(
            "Error deleting task:",
            error.message
        );

        res.status(500).json({
            message: "Failed to delete task"
        });
    }
});


// ===============================
// REGISTER USER
// ===============================

app.post("/api/register", async (req, res) => {
    try {
        const {
            name,
            email,
            password
        } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message:
                    "Name, email, and password are required"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message:
                    "Password must contain at least 6 characters"
            });
        }

        const normalizedEmail =
            email.trim().toLowerCase();

        const existingUser =
            await User.findOne({
                email: normalizedEmail
            });

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword
        });

        res.status(201).json({
            message: "User Registered Successfully",

            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });

    } catch (error) {
        console.log(
            "Error registering user:",
            error.message
        );

        res.status(500).json({
            message: "Registration Failed"
        });
    }
});


// ===============================
// LOGIN USER
// ===============================

app.post("/api/login", async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message:
                    "Email and password are required"
            });
        }

        const normalizedEmail =
            email.trim().toLowerCase();

        const user = await User.findOne({
            email: normalizedEmail
        });

        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }

        const isPasswordCorrect =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid Password"
            });
        }

        // ===============================
        // CREATE JWT TOKEN
        // ===============================

        const token = jwt.sign(
            {
                userId: user._id
            },
            process.env.JWT_SECRET || "mysecretkey",
            {
                expiresIn: "1h"
            }
        );

        res.status(200).json({
            message: "Login Successful",

            token: token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.log(
            "Login error:",
            error.message
        );

        res.status(500).json({
            message: "Login Failed"
        });
    }
});


// ===============================
// START SERVER
// ===============================

app.listen(5001, () => {
    console.log(
        "Server is Running on port 5001"
    );
});