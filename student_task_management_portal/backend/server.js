const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const tasks = [
  {
    id: 1,
    title: "Learn React",
    description: "Understanding Components",
    status: "Completed",
  },
  {
    id: 2,
    title: "Learn JavaScript",
    description: "Understanding Variables and Functions",
    status: "Pending",
  },
  {
    id: 3,
    title: "Learn MongoDB",
    description: "Understanding Databases",
    status: "Pending",
  },
];

app.get("/", (req, res) => {
  res.send("backend is running");
});

app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

app.listen(5000, () => {
  console.log("server is running on port 5000");
});