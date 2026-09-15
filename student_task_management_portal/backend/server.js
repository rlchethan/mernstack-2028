const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.json());

const tasks = [
    {
        id: 1,
        title: "Learn React",
        description: "Understanding Components",
        status: "Completed"
    },
    {
        id: 2,
        title: "Learn JavaScript",
        description: "Understanding Variables and Functions",
        status: "Pending"
    },
    {
        id: 3,
        title: "Learn MongoDB",
        description: "Understanding Databases",
        status: "Pending"
    }
];


// Test backend
app.get("/", (req, res) => {
    res.send("Backend is running");
});


// Get all tasks
app.get("/api/tasks", (req, res) => {
    res.json(tasks);
});


app.listen(5001, () => {
    console.log("Server is running on port 5001");
});
app.post("/api/tasks", (req, res) => {
    const newTask = req.body;
    tasks.push(newTask);
    res.status(201).json(newTask);
});

